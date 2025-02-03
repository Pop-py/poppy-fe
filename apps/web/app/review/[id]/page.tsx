'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { createReview, SubHeader } from '@/src/widgets';
import { IconButton, PrimaryButton, Textarea } from '@/src/shared';
import { useState, useRef, useEffect } from 'react';
import { Camera, ImageDelete } from '@/public';
import { useLoginStore, useUserInfo } from 'store/login/loginStore';

export default function Page() {
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [star, setStar] = useState(0);
  const router = useRouter();

  const handleStarClick = (index: number) => {
    setStar(index);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prevImages => [...prevImages, ...newImages]);
      setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const { id } = useParams();
  const { token } = useLoginStore();

  const handleSubmit = async () => {
    if (!isButtonEnabled || textareaValue.length > 300) return;
    const formData = new FormData();

    selectedFiles.forEach((file: File) => {
      formData.append('images', file);
    });

    formData.append('content', textareaValue);
    formData.append('rating', star.toString());
    try {
      await createReview(Number(id), formData, token as string);
      router.push(`/detail/${id}`);
    } catch (error) {
      console.error('리뷰 작성 실패:', error);
    }
  };

  const isButtonEnabled = textareaValue.length > 0 && star > 0;

  return (
    <div className="flex flex-col items-center w-full h-full px-[16px]">
      {/* Header */}
      <SubHeader iconButton label="리뷰 남기기" />

      {/* Content Area */}
      <div className="flex flex-col w-full h-full pt-[64px]">
        {/* Star Area */}
        <div className="flex flex-col gap-y-[8px] mb-[32px]">
          <span className="text-gray-900 text-h4">방문하신 팝업스토어, 어떠셨나요?</span>
          <div className="flex gap-x-[4px]">
            {Array.from({ length: 5 }, (_, index) => (
              <IconButton
                key={index}
                icon={index < star ? 'ic-star-active' : 'ic-star'}
                size="xlg"
                onClick={() => handleStarClick(index + 1)}
              />
            ))}
          </div>
        </div>

        {/* Review Area */}
        <div className="mb-[12px]">
          <span className="text-gray-900 text-h4">리뷰 작성</span>
          <div className="flex">
            <div className="flex items-center gap-x-[8px] mr-[8px]">
              {/* Button Area */}
              <div className="w-[80px] h-[80px] flex border border-gray-100 rounded-4">
                <button
                  className="flex flex-col items-center justify-center w-full h-full"
                  type="button"
                  onClick={handleButtonClick}>
                  <Camera />
                  <span className="text-gray-400 text-c1">{selectedImages.length} / 5</span>
                </button>
              </div>
              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>

            {/* Scrollable Image Previews */}
            {selectedImages.length > 0 && (
              <div className="flex overflow-x-auto gap-x-[8px]">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative flex-shrink-0 w-[80px] h-[80px]">
                    <Image
                      src={image}
                      alt={`preview-${index}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full rounded-4"
                    />
                    <button
                      className="absolute top-[4px] right-[4px]"
                      type="button"
                      onClick={() => handleRemoveImage(index)}>
                      <ImageDelete />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Textarea Area */}
        <Textarea
          placeholder="방문하신 팝업스토어의 후기를 남겨주시면, 다른 사용자들에게도 도움이 됩니다."
          onChange={handleTextareaChange}
        />
      </div>

      {/* Footer */}
      <footer className="w-full py-[8px]">
        <PrimaryButton
          variant={isButtonEnabled ? 'enabled' : 'disabled'}
          disabled={!isButtonEnabled}
          onClick={handleSubmit}>
          작성 완료
        </PrimaryButton>
      </footer>
    </div>
  );
}
