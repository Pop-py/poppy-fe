'use client';

import * as React from 'react';
import { BottomNavigation } from '@/src/widgets';
import { DropdownButton, FilterIconButton, FocusIconButton, IconButton, Input, MapSearchButton } from '@/src/shared';

import { createCustomMarker } from '@/src/shared/ui/markers/customMarker';
import MarkerInfoSheet from '@/src/shared/ui/bottomsheet/markerInfoSheet';
import FilterSheet from '@/src/shared/ui/bottomsheet/filterSheet';
import { FilterParams } from './model/searchData';
import { useQuery } from 'react-query';
import FilterStoreSheet from '@/src/shared/ui/bottomsheet/filterStoreSheet';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { fetchAddress } from '@/src/widgets/search/api/addressApi';
import { fetchNamePopupStores } from '@/src/widgets/search/api/nameSearchApi';

type Props = {};

declare global {
  interface Window {
    initMap?: () => void;
  }
}

const Page = (props: Props) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<naver.maps.Map | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = React.useState(false);
  const [isFilterStoreSheetOpen, setIsFilterStoreOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeTab, setActiveTab] = React.useState<string>('c');
  const [selectedFilters, setSelectedFilters] = React.useState<{
    date: Date | null;
    location: string[];
    rating: string;
    category: string[];
  }>({
    date: null,
    location: [],
    rating: '',
    category: [],
  });

  const [selectedMarkerData, setSelectedMarkerData] = React.useState<{
    title: string;
    date: string;
    description: string;
    images: string[];
    startDate?: { year: number; month: number; day: number };
    endDate?: { year: number; month: number; day: number };
  }>({
    title: '',
    date: '',
    description: '',
    images: [], // 초기값으로 빈 배열 설정
    startDate: undefined,
    endDate: undefined,
  });

  const applyFilters = (
    filters: React.SetStateAction<{ date: Date | null; location: string[]; rating: string; category: string[] }>,
  ) => {
    setSelectedFilters(filters);
  };

  const toggleFilterSheet = (tab: string) => {
    setActiveTab(tab);
    setIsFilterSheetOpen(prev => !prev);
  };

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=tiv3ffuyzr&submodules=geocoder&callback=initMap`;
    // script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=BQWHygOSqhKLtydUBlEJ&submodules=geocoder&callback=initMap`;

    script.async = true;

    window.initMap = () => {
      if (!mapRef.current) return;

      const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.978), // 초기 중심 좌표
        zoom: 13,
        logoControl: false,
        mapDataControl: false,
        scaleControl: false,
      };

      mapInstance.current = new naver.maps.Map(mapRef.current, mapOptions);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      window.initMap = undefined;
    };
  }, []);

  const handleMarkerClick = (store: any) => {
    setSelectedMarkerData(store); // 팝업스토어 데이터를 그대로 저장
    setIsBottomSheetOpen(true); // BottomSheet 열기
  };

  const normalizeAddress = (address: string): string => {
    if (address.startsWith('서울시')) {
      return address.replace('서울시', '서울특별시');
    }
    return address;
  };

  //도로명 -> 위도경도로
  const searchAddressToCoordinate = (address: string, callback: (lat: number | null, lng: number | null) => void) => {
    const normalizedAddress = normalizeAddress(address);

    if (!naver.maps.Service || !naver.maps.Service.geocode) {
      callback(null, null);
      return;
    }

    naver.maps.Service.geocode(
      {
        query: normalizedAddress, // 변환할 주소
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          callback(null, null);
          return;
        }

        const result = response.v2.addresses[0]; // 첫 번째 결과
        if (!result) {
          callback(null, null);
          return;
        }

        const { x, y } = result; // x = 경도(lng), y = 위도(lat)
        const lat = parseFloat(y); // 문자열을 숫자로 변환
        const lng = parseFloat(x); // 문자열을 숫자로 변환

        callback(lat, lng);
      },
    );
  };

  //위도경도 -> 도로명으로
  const searchCoordinateToAddress = (latlng: naver.maps.LatLng, callback: (jibunAddress: string | null) => void) => {
    if (!naver.maps.Service || !naver.maps.Service.reverseGeocode) {
      callback(null);
      return;
    }

    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [naver.maps.Service.OrderType.ADDR, naver.maps.Service.OrderType.ROAD_ADDR].join(','),
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          console.error('Reverse Geocoding 오류 발생:', status);
          callback(null);
          return;
        }

        const items = response.v2.results;
        if (!items || items.length === 0) {
          console.error('결과를 찾을 수 없습니다.');
          callback(null);
          return;
        }

        // 지역 정보 추출
        let area1 = items[0]?.region?.area1?.name || ''; // 시도 (서울특별시)
        const area2 = items[0]?.region?.area2?.name || ''; // 시군구 (중구)

        if (area1 === '서울특별시') {
          area1 = '서울시';
        }

        const fullAddress = `${area1} ${area2}`.trim(); // '서울특별시 중구' 형식으로 조합
        callback(fullAddress);
      },
    );
  };

  //이 지역에서 검색
  const handleMapSearch = async () => {
    if (!mapInstance.current) {
      return;
    }

    const center = mapInstance.current.getCenter(); // 현재 지도 중심 좌표 가져오기
    const latLng = new naver.maps.LatLng(center.y, center.x); // LatLng로 변환

    searchCoordinateToAddress(latLng, async jibunAddress => {
      if (jibunAddress) {
        try {
          const popupStores = await fetchAddress(jibunAddress); // API 호출

          const categoryMapping: { [key: string]: string } = {
            '패션/뷰티': 'fashion',
            아트: 'art',
            음식: 'food',
            굿즈: 'goods',
            라이프: 'life',
          };

          // 받은 팝업스토어 데이터를 하나씩 처리하여 마커 생성
          popupStores.forEach((store: any) => {
            const address = store.address;

            const category = categoryMapping[store.categoryName] || 'default'; // 매핑되지 않은 경우 기본값

            // 주소를 위도/경도로 변환하여 마커 추가
            searchAddressToCoordinate(address, (lat, lng) => {
              if (lat !== null && lng !== null && mapInstance.current) {
                // createCustomMarker 함수 사용
                createCustomMarker({
                  map: mapInstance.current,
                  lat,
                  lng,
                  category,
                  name: store.name,
                  onMarkerClick: () => handleMarkerClick(store),
                });
              }
            });
          });
        } catch (error) {
          console.error('팝업스토어 데이터를 가져오는 중 에러 발생:', error);
        }
      }
    });
  };

  //내 현재위치
  const handleFocusButtonClick = () => {
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      if (mapInstance.current) {
        mapInstance.current.setCenter(new naver.maps.LatLng(latitude, longitude));

        // 현재 위치에 마커 추가
        new naver.maps.Marker({
          position: new naver.maps.LatLng(latitude, longitude),
          map: mapInstance.current,
        });
      }
    });
  };

  const {
    data: nameSearchResult,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['popupStores', searchQuery], // Query 키와 검색어
    () => fetchNamePopupStores(searchQuery), // API 호출 함수
    {
      enabled: false,
    },
  );

  // 검색 실행 함수
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }
    refetch();
    setIsFilterStoreOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleResetFilter = () => {
    setIsFilterStoreOpen(false);
    setSelectedFilters({
      date: null,
      location: [],
      rating: '',
      category: [],
    });
    setActiveTab('c');
    setIsFilterSheetOpen(true);
  };

  return (
    <div className="relative flex flex-col h-screen">
      <div ref={mapRef} className="flex-grow"></div>
      <div className="absolute flex-col top-[38px] left-0 w-full px-16 z-10 flex items-center gap-2 ">
        <Input
          variantType="search"
          placeholder="팝업스토어명 검색"
          className="flex-grow"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onClick={handleClear}
        />
        <div className="flex justify-start w-full gap-2 mt-8">
          <FilterIconButton
            variant={
              selectedFilters.date ||
              (selectedFilters.location.length > 0 && !selectedFilters.location.includes('전체')) ||
              (selectedFilters.rating && selectedFilters.rating !== '전체') ||
              (selectedFilters.category.length > 0 && !selectedFilters.category.includes('전체'))
                ? 'active'
                : 'inactive'
            }
            onClick={() => toggleFilterSheet('c')}
          />
          <DropdownButton
            value={
              selectedFilters.date
                ? format(selectedFilters.date, 'MM.dd(E)', { locale: ko }) // 원하는 형식으로 날짜 표시
                : '날짜'
            }
            variant={selectedFilters.date ? 'active' : 'inactive'}
            onClick={() => toggleFilterSheet('c')}
          />
          <DropdownButton
            value={
              selectedFilters.location.length > 0 && !selectedFilters.location.includes('전체')
                ? selectedFilters.location.length > 2
                  ? `${selectedFilters.location[0]} 외 ${selectedFilters.location.length - 1}개`
                  : selectedFilters.location.join(', ')
                : '위치'
            }
            variant={
              selectedFilters.location.length > 0 && !selectedFilters.location.includes('전체') ? 'active' : 'inactive'
            }
            onClick={() => toggleFilterSheet('d')}
          />
          <DropdownButton
            value={selectedFilters.rating && selectedFilters.rating !== '전체' ? `${selectedFilters.rating}` : '평점'}
            variant={selectedFilters.rating && selectedFilters.rating !== '전체' ? 'active' : 'inactive'}
            onClick={() => toggleFilterSheet('e')}
          />
          <DropdownButton
            value={
              selectedFilters.category.length > 0 && !selectedFilters.category.includes('전체')
                ? selectedFilters.category.includes('패션 · 뷰티')
                  ? selectedFilters.category.length > 1
                    ? `패션 · 뷰티 외 ${selectedFilters.category.length - 1}개`
                    : '패션 · 뷰티'
                  : selectedFilters.category.length > 2
                    ? `${selectedFilters.category[0]} 외 ${selectedFilters.category.length - 1}개`
                    : selectedFilters.category.join(', ')
                : '카테고리'
            }
            variant={
              selectedFilters.category.length > 0 && !selectedFilters.category.includes('전체') ? 'active' : 'inactive'
            }
            onClick={() => toggleFilterSheet('f')}
          />
        </div>
      </div>
      <div className={`absolute left-3 ${isBottomSheetOpen ? 'bottom-[320px]' : 'bottom-[100px]'}`}>
        <FocusIconButton variant="inactive" onClick={handleFocusButtonClick} />
      </div>
      <div className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2">
        <MapSearchButton onClick={handleMapSearch}>이 지역에서 검색</MapSearchButton>
      </div>

      <div className="fixed bottom-0 z-20 w-full">
        <BottomNavigation />
      </div>

      <FilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        activeTab={activeTab}
        filters={selectedFilters || { date: null, location: ['전체'], rating: '전체', category: ['전체'] }}
        onApplyFilter={filters => {
          setSelectedFilters(filters);
        }}
        onResetFilter={handleResetFilter}
      />

      {isBottomSheetOpen && (
        <MarkerInfoSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          markerData={selectedMarkerData || []}
        />
      )}

      <FilterStoreSheet
        isOpen={isFilterStoreSheetOpen}
        onClose={() => setIsFilterStoreOpen(false)}
        data={nameSearchResult || []}
        onResetFilter={handleResetFilter}
      />
    </div>
  );
};

export default Page;
