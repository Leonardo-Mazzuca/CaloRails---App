import { View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  onPickImage?: () => void
};

const ImageUploader = ({ image, setImage,onPickImage }: Props) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      
    }

  };

  return (
    <View className="relative">
      <TouchableOpacity
        style={{
          borderColor: "#6b7280",
          borderWidth: 1,
          borderStyle: "dashed",
          borderRadius: 5,
          height: 120,
        }}
        onPress={pickImage}
        className="items-center justify-center p-4"
      >
        <View
          style={{
            borderColor: "#6b7280",
            borderWidth: 1,
            borderStyle: "dashed",
            borderRadius: 5,
            height: 50,
          }}
          className="items-center justify-center p-3"
        >
          <AntDesign name="plus" size={24} color="#6b7280" />
        </View>
      </TouchableOpacity>

      {image && 
      <TouchableOpacity 
      onPress={pickImage} 
      style={{left:140, top: 10,borderRadius:20,overflow:'hidden'}} className="absolute">

          <Image 
            resizeMode="cover" 
            className="w-[100px] h-[100px]" 
            source={{ uri: image }}
     
            
        />    

      </TouchableOpacity>

        }

    </View>
  );
};

export default ImageUploader;
