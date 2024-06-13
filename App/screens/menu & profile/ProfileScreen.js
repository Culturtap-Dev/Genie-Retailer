import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EditIconWhite from "../../assets/editIconWhite.svg";
import EditIcon from "../../assets/editIcon.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../redux/reducers/storeDataSlice";
import { launchCamera } from "react-native-image-picker";
import { manipulateAsync } from "expo-image-manipulator";
import DelImg from "../../assets/delImg.svg"
import {
        FontAwesome,
        Entypo,
      
      } from "@expo/vector-icons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //   const [user,setUser]= useState(route.params.user);
  const user = useSelector((state) => state.storeData.userDetails);
  console.log("user at profile", user);

  const [editableField, setEditableField] = useState(null);
  const [location, setLocation] = useState(user?.location || "");

  const [storeName, setStoreName] = useState(user?.storeName || "");
  const [storeOwnerName, setStoreOwnerName] = useState(
    user?.storeOwnerName || ""
  );
  const [storeCategory, setStoreCategory] = useState(user?.storeCategory || "");
  const [storeMobileNo, setStoreMobileNo] = useState(user?.storeMobileNo || "");
  const [panCard, setPanCard] = useState(user?.panCard || "");


  const handleEditPress = (field) => {
    setEditableField(field);
  };

  const handleSavePress = async (field) => {
    const fieldMapping = {
      storeName,
      storeOwnerName,
      storeCategory,
      storeMobileNo,
      panCard,
      location,
    };
      setIsLoading(true)
    try {
      const response = await axios.patch(
        `https://culturtap.com/api/retailer/editretailer`,
        {
          _id: user?._id,
          [field]: fieldMapping[field],
        }
      );

      if (response.status === 200) {
        // Update successful
        console.log("updated", response.data);
        dispatch(setUserDetails(response.data));
        await AsyncStorage.setItem("userData", JSON.stringify(response.data));

        console.log("Profile updated successfully");
      } else {
        // Handle the case where the update wasn't successful
        console.error("Failed to update profile");
      }

      setEditableField(null);
    } catch (error) {
      console.error("Failed to update profile", error);
      // Handle error (e.g., show an alert to the user)
    }finally{
      setIsLoading(false)
    }
  };

  const handleEditIconPress = async (type) => {
    const options = {
      mediaType: "photo",
      saveToPhotos: true,
    };
    console.log("type",type)

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        try {
          const newImageUri = response.assets[0].uri;
          const compressedImage = await manipulateAsync(
            newImageUri,
            [{ resize: { width: 800, height: 800 } }],
            { compress: 0.5, format: "jpeg", base64: true }
          );
          await getImageUrl({ image: compressedImage, type: type });

          // Update user or perform other operations here
        } catch (error) {
          console.error("Error processing image: ", error);
        }
      }
    });
  };

  const getImageUrl = async ({image,type}) => {
    setLoading(true);
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/kumarvivek/image/upload";
    const base64Img = `data:image/jpg;base64,${image.base64}`;
    const data = {
      file: base64Img,
      upload_preset: "CulturTap",
      quality: 50,
    };

    try {
      const response = await fetch(CLOUDINARY_URL, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });

      const result = await response.json();
      if (result.secure_url) {
        console.log("user image", result.secure_url);
        let updatedUser;
        if(type==="main"){
        updatedUser = {
          ...user,
          storeImages: [result.secure_url, ...user.storeImages.slice(1)],
         
        };
        }
        else{
                updatedUser = {
                        ...user,
                        storeImages: [ ...user.storeImages,result.secure_url],
                      }; 
        }
       dispatch(setUserDetails(updatedUser));
        await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
        const response = await axios.patch(
          `https://culturtap.com/api/retailer/editretailer`,
          {
            _id: user?._id,
            storeImages: updatedUser.storeImages,
          }
        );
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const deleteImage = async(index) => {
        
        if ( index >= 0 && index < user.storeImages.length) {
        
          const updatedStoreImages = [
            ...user.storeImages.slice(0, index),
            ...user.storeImages.slice(index + 1),
          ];
          const updatedUser = {
            ...user,
            storeImages: updatedStoreImages,
          };
          dispatch(setUserDetails(updatedUser));
          await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
          const response = await axios.patch(
            `https://culturtap.com/api/retailer/editretailer`,
            {
              _id: user?._id,
              storeImages: updatedUser.storeImages,
            }
          );
        } else {
          console.error('Invalid index for deleting image');
        }
      };
      

  return (
    <View className="">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-[50px] flex">
          <View className="flex  relative flex-row px-[32px] items-center">
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              className="flex z-40 absolute flex-row p-[10px] pl-[32px] left-0  items-center gap-2"
            >
              <FontAwesome name="arrow-left" size={15} color="black" />
            </Pressable>
            <Text className="text-[16px] flex-1 text-center" style={{ fontFamily: "Poppins-Bold" }}>
              Store Profile
            </Text>
          </View>
          <Text className="text-center mb-[20px] capitalize" style={{ fontFamily: "Poppins-Regular" }}>
            {user?.storeName}
          </Text>
          <View className="flex items-center relative justify-center">
            <View>
                { user?.storeImages.length>0 &&
              <Image
                source={{ uri: user?.storeImages[0] }}
                className="w-[130px] h-[130px] rounded-full object-cover"
              />
                }
                { user?.storeImages.length===0 &&
              <View className="w-[130px] h-[130px] rounded-full bg-gray-300 border-[1px] border-gray-500">
                
              </View>
                }
              <TouchableOpacity onPress={()=>{handleEditIconPress("main")}}>
                <View className="absolute right-[2px] bottom-[7px] w-[36px] h-[36px] bg-[#fb8c00] flex justify-center items-center rounded-full">
                  <EditIconWhite className="px-[10px]" />
                </View>
                </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row items-center justify-between px-[32px] my-[10px]">
            <Text style={{ fontFamily: "Poppins-Regular" }}>Store Images</Text>
            <TouchableOpacity onPress={()=>{handleEditIconPress("other")}}>
              <EditIcon className="p-[10px]" />
              </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="pl-[32px] flex flex-row gap-[11px] mb-[60px]">
              {user?.storeImages?.map((image, index) => (
                <View key={index} className="rounded-[16px]">
                  <Image
                    source={{ uri: image }}
                    width={119}
                    height={164}
                    className="rounded-[16px] border-[1px] border-[#cbcbce] object-cover"
                  />
                  <Pressable
                              onPress={() => deleteImage(index)}
                              style={styles.deleteIcon}
                            >
                             <DelImg/>
                            </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>
          <View className="px-[32px] flex flex-col gap-[26px] mb-[20px]">
            <EditableField
              label="Store Location"
              value={location}
              editable={editableField === "location"}
              onChangeText={setLocation}
              onEditPress={() => handleEditPress("location")}
              onSavePress={() => handleSavePress("location")}
              isLoading={isLoading}

            />
            <EditableField
              label="Store Name"
              value={storeName}
              editable={editableField === "storeName"}
              onChangeText={setStoreName}
              onEditPress={() => handleEditPress("storeName")}
              onSavePress={() => handleSavePress("storeName")}
              isLoading={isLoading}
            />
            <EditableField
              label="Store Owner Name"
              value={storeOwnerName}
              editable={editableField === "storeOwnerName"}
              onChangeText={setStoreOwnerName}
              onEditPress={() => handleEditPress("storeOwnerName")}
              onSavePress={() => handleSavePress("storeOwnerName")}
              isLoading={isLoading}
            />
            <EditableField
              label="Store Category"
              value={storeCategory}
              editable={editableField === "storeCategory"}
              onChangeText={setStoreCategory}
              onEditPress={() => handleEditPress("storeCategory")}
              onSavePress={() => handleSavePress("storeCategory")}
              isLoading={isLoading}
            />
            <EditableField
              label="Mobile Number"
              value={storeMobileNo}
              editable={false}
              onChangeText={setStoreMobileNo}
              onEditPress={() => handleEditPress("storeMobileNo")}
              onSavePress={() => handleSavePress("storeMobileNo")}
              isLoading={isLoading}
            />
            <EditableField
              label="PanCard"
              value={panCard}
              editable={editableField === "panCard"}
              onChangeText={setPanCard}
              onEditPress={() => handleEditPress("panCard")}
              onSavePress={() => handleSavePress("panCard")}
              isLoading={isLoading}
            />
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fb8c00" />
        </View>
      )}
    </View>
  );
};

const EditableField = ({
  label,
  value,
  editable,
  onChangeText,
  onEditPress,
  onSavePress,
  isLoading
}) => (
  <View className="flex flex-col gap-[11px]">
    <View className="flex-row justify-between">
      <Text className="text-[14px] text-[#2e2c43]" style={{ fontFamily: "Poppins-Regular" }}>{label}</Text>
      {label === "Store Location" && (
        <Pressable
          onPress={() => {
            console.log("refresh");
          }}
        >
          <Text className="text-[14px] text-[#FB8C00]" style={{ fontFamily: "Poppins-Bold" }}>Refresh</Text>
        </Pressable>
      )}
    </View>

    <KeyboardAvoidingView className="flex items-center">
      <View className="flex flex-row items-center justify-between w-[324px] h-[54px] px-[20px] bg-[#F9F9F9] rounded-[16px]">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          placeholder={label}
          placeholderTextColor={"#dbcdbb"}
          className="w-[250px] text-[14px]  text-black capitalize"
          style={{ fontFamily: "Poppins-Regular" }}
        />
        {
          label!="Mobile Number" && <TouchableOpacity onPress={editable ? onSavePress : onEditPress}>
          {editable ? (
            isLoading ? (
              <View className="text-[14px] bg-[#FB8C00] p-2 px-4 rounded-xl" >
              <ActivityIndicator size="small" color="#ffffff" />
              </View>
            ) : (
              <Text className="text-[14px] bg-[#FB8C00] text-white p-2 rounded-xl" style={{ fontFamily: "Poppins-SemiBold" }}>
                Save
              </Text>
            )
          ) : (
            <EditIcon className="px-[10px]" />
          )}
        </TouchableOpacity>
        }
       
      </View>
    </KeyboardAvoidingView>
  </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  deleteIcon: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "white",
        borderRadius: 50,
        padding: 1,
      },
});
