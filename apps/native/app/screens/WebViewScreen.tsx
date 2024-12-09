import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

const WebViewScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://poppy-c6jhr4vo8-poppy-ca4d5978.vercel.app' }} // 여기에 원하는 웹사이트 URL을 입력하세요
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30, // 위아래 마진 추가
  },
  webview: {
    flex: 1,
  },
});

export default WebViewScreen;
