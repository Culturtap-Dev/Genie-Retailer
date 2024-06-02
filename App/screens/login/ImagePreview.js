import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
 
} from "react-native";
import React, { useEffect, useState , useRef} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import ArrowLeft from '../../assets/arrow-left.svg';
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
// import { setMainImage,addOtherImage } from '../../redux/reducers/storeDataSlice';
import { useDispatch, useSelector } from "react-redux";
import { setImages } from "../../redux/reducers/storeDataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const ImagePreview = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imagesLocal, setImagesLocal] = useState(route.params.data);
  const dispatch = useDispatch();
  const storeDescription = useSelector(
    (state) => state.storeData.storeDescription
  );
  const uniqueToken = useSelector((state) => state.storeData.uniqueToken);
  console.log("images", imagesLocal);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);



  const handleImage = async () => {
    console.log("old images",imagesLocal);
    const newImages = [...imagesLocal];
    [newImages[0], newImages[selectedImageIndex]] = [newImages[selectedImageIndex], newImages[0]];
    //  setImagesLocal(newImages);
    //  console.log("new images",imagesLocal);
    //  setSelectedImageIndex(0);
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    const userId = userData._id;


    try {
       

      // Update location on server
      const response = await axios.patch(
        `https://genie-backend-meg1.onrender.com/retailer/editretailer`,
        {
          _id: userId,
          storeImages: newImages,
          storeDescription: storeDescription,
          uniqueToken: uniqueToken,
        }
      );

      // console.log('Image updated successfully:', response.data);

      // Update user data in AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(response.data));

      // Navigate to home only after successfully updating the location
      navigation.navigate("home");
    } catch (error) {
      console.error("Failed to update images:", error);
      // Optionally handle error differently here
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View className="w-full z-40 mt-[40px]  flex flex-row justify-between items-center  px-[32px]">
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            className="flex p-2 flex-row items-center  gap-2"
          >
            <FontAwesome name="arrow-left" size={15} color="black" />
          </Pressable>
          <Text className="flex flex-1 justify-center items-center text-center text-[16px]">
            Select Store Profile Pic
          </Text>
        </View>

        <View className="w-full flex items-center justify-center mt-[36px]">
          <View
            style={{ overflowX: "scroll" }}
            className="flex-row w-screen justify-center  gap-[10px] mt-[25px]"
          >
            {
              <View className="rounded-full">
                {imagesLocal ? (
                  <Image
                    source={{ uri: imagesLocal[selectedImageIndex] }}
                    width={271}
                    height={271}
                    className="rounded-full border-[1px] border-slate-400 object-contain"
                  />
                ) : (
                  <View className="h-[271px] w-[271px] rounded-full border-[1px] border-slate-400 object-contain"></View>
                )}
              </View>
            }
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View className="flex-row  gap-[10px] mt-[25px] px-[32px]">
                    {imagesLocal.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageClick(index)}>
            <View
              className={`rounded-3xl ${
                selectedImageIndex === index ? 'border-2 border-[#fb8c00]' : 'border-[1px] border-slate-400'
              }`}
            >
              <Image
                source={{ uri: image }}
                width={140}
                height={200}
                className="rounded-3xl object-contain"
              />
            </View>
          </TouchableOpacity>
        ))}
                    </View>
                </ScrollView>
       {/* <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <DraggableFlatList showsHorizontalScrollIndicator={false}
          data={imagesLocal}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          onDragEnd={({ data }) => setImagesLocal(data)}
          horizontal
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </GestureHandlerRootView> */}
        <View className="w-full h-[68px]  bg-[#fb8c00] justify-center absolute bottom-0 left-0 right-0">
          <TouchableOpacity onPress={handleImage}>
            <View className="w-full flex items-center justify-center">
              <Text className="text-white font-bold text-center text-[16px]">
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      marginTop: 25,
      paddingHorizontal: 32,
    },
    contentContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    imageContainer: {
      borderRadius: 30,
      borderWidth: 1,
      borderColor: 'slategray',
      overflow: 'hidden',
    },
    activeImageContainer: {
      backgroundColor: '#f0f0f0',
    },
    image: {
      width: 140,
      height: 200,
    },
  });
  
  
export default ImagePreview;
