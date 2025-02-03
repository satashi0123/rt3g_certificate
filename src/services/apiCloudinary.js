export default async function uploadImageToCloudinary(file, folderName) {
  const cloudName = "btccongnghe3goc";
  const unsignedUploadPreset = "ml_default";
  const apiKey = "691291897447864";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unsignedUploadPreset);
  formData.append("folder", folderName);
  formData.append("api_key", apiKey);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    const data = await response.json();
    // console.log("data");
    // console.log(data);
    return data.display_name;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
