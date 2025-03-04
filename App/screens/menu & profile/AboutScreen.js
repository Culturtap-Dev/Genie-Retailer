import { View, Text,  Image, Pressable, ScrollView, TouchableOpacity,Dimensions } from 'react-native'
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import AboutImg from "../../assets/AboutImg.svg"
import Time from "../../assets/aboutClock.svg"
import Wealth  from "../../assets/aboutWealth.svg"
import Health  from "../../assets/aboutHealth.svg"
import Analytics  from "../../assets/analytics.svg"

import { SafeAreaView } from 'react-native-safe-area-context';
import BackArrow from "../../assets/BackArrow.svg";

// console
const AboutScreen = () => {
    const navigation = useNavigation();
  const { width } = Dimensions.get("window")

    return (
        <View style={{ flex: 1 ,backgroundColor:"white"}}>
            <ScrollView style={{ flex: 1 }} className="relative">


                <View className="z-50 absolute  left-[16px] " style={{marginTop:25}}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }} style={{padding:20,borderRadius:100}}>
                    <BackArrow  />

                    </TouchableOpacity>
                </View>



                <Text className="text-center pt-[40px] text-[16px]  mb-[60px] text-black" style={{ fontFamily: "Poppins-Bold" }}>About CulturTap Genie {"\n"}Business</Text>

                

                <View className="flex flex-col justify-center items-center gap-[40px] px-[30px] mb-[100px]">
                   <View>
                    <AboutImg className="" width={width}/>
                   </View>
                   <View className="gap-[20px]">
                      <Text className="text-center text-[14px] text-[#2E2C43]" style={{ fontFamily: "Poppins-Bold" }}>
                      "Get bigger profit and more sales with high demand"
                      </Text>
                      <Text className="text-center text-[14px] text-[#2E2C43]" style={{ fontFamily: "Poppins-Regular" }}>
                      Give the best offers to the customers to attract them, and you will experience high demand for your stock products if you engage in smart bargaining.
                      </Text>
                    </View>
                    <View className="gap-[15px] items-center">
                        <Text className="text-center text-[14px] text-[#2E2C43]" style={{ fontFamily: "Poppins-Black" }}>
                        We support small business
                        </Text>
                        <Analytics/>
                     
                        <Text className="text-center text-[14px] text-[#2E2C43] " style={{ fontFamily: "Poppins-Regular" }}>
                        We're here to help. Let us know what you need to get started. We'll set up a category for your small business on our platform and bring in customers for you.
                        </Text>
                    </View>
                    <View className="gap-[15px] items-center">
                        <Text className="text-center text-[14px] text-[#2E2C43]" style={{ fontFamily: "Poppins-Black" }}>
                        Spend time effectively
                        </Text>
                        <Time/>
                     
                        <Text className="text-center text-[14px] text-[#2E2C43]" style={{ fontFamily: "Poppins-Regular" }}>
                        Spend your working time wisely.Get your regular customers online now. 
                        </Text>
                    </View>
                    <View className="gap-[15px] items-center">
                        <Text className="text-center text-[14px] text-[#2E2C43] " style={{ fontFamily: "Poppins-Black" }}>
                        Be a wealthy business
                        </Text>
                        <Wealth/>
                       
                      <Text className="text-center text-[14px] text-[#2E2C43]" style={{ fontFamily: "Poppins-Regular" }}>
                        Boost your shop and business without spending extra on marketing. Attract the right customers by mastering the art of bargaining.
                        </Text>
                         
                      <Text className="text-center text-[14px] text-[#2E2C43]" style={{ fontFamily: "Poppins-Regular" }}>
                      We are dedicated to helping small businesses become more prosperous.
                        </Text>
                        
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

export default AboutScreen;