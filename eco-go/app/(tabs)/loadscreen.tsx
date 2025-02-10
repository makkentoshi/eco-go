// (tabs)/loadscreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const LoadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //const { image } = route.params; // Получите URI изображения, если передаете его

  // Здесь можно добавить логику для отображения прогресса обработки изображения
  // Например, отображать анимацию или процент завершения.

  // В данном примере просто ждем 3 секунды и возвращаемся на главный экран
  useEffect(() => {
    // setTimeout(() => {
    //   navigation.goBack(); // Возвращаемся назад (на предыдущий экран)
    // }, 3000); // 3 секунды
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/*{image && <Image source={{ uri: image }} style={styles.image} />}*/}
      <Text style={styles.text}>Подождите, фотография обрабатывается...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default LoadScreen;