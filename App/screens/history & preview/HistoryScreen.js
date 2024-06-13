import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Profile from "../../assets/ProfileIcon.svg";
import GinieIcon from "../../assets/GinieBusinessIcon.svg";
import History from "../../assets/HistoryIcon.svg";
import Close from "../../assets/delImg.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { setRequestInfo } from "../../redux/reducers/requestDataSlice";
import ProductOrderCard from "../../components/ProductOrderCard";
import { useDispatch, useSelector } from "react-redux";

const HistoryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const retailerHistory= useSelector(state => state.requestData.retailerHistory|| [])

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="flex flex-row justify-between items-center px-[32px] ">
          <View className="bg-[#FB8C00] p-[4px] rounded-full">
            <TouchableOpacity onPress={() => navigation.navigate("menu")}>
              <Profile />
            </TouchableOpacity>
          </View>
          <GinieIcon />
          <View className="bg-[#FB8C00] p-[4px] rounded-full">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Close />
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView className="flex-1">
          <Text className="text-[14px] text-center mb-[20px] " style={{ fontFamily: "Poppins-Bold" }}>Your History</Text>

          <View className=" flex flex-col gap-[10px] mb-[20px] items-center justify-center">
            {retailerHistory && retailerHistory.length > 0 ? (
              retailerHistory?.map((product) => (
                <TouchableOpacity
                  key={product._id}
                  onPress={() => {
                    dispatch(setRequestInfo(product));
                    // console.log("requestInfo at history", product);
                    navigation.navigate("requestPage");
                  }}
                  style={{
                    backgroundColor: '#fff', // Ensure the background is white
                    margin: 10, // Add some margin if necessary for better shadow visibility
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,
                    borderRadius:10
                  }}
                >
                  <ProductOrderCard key={product._id} product={product} />
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-[14px] text-center mb-[20px]" style={{ fontFamily: "Poppins-Regular" }}>
                No History
              </Text>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({});
