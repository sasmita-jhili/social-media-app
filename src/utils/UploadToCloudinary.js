const cloud_name = "sasmita65";
const upload_preset = "social-media"; 

export const UploadToCloudinary = async (pics, fileType) => {
  if (pics && fileType) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
        { method: "post", body: data }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const fileData = await res.json();

      console.log("fileData....", fileData.url);

      return fileData.url;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error; 
    }
  } else {
    console.log("error: pics and fileType are required.");
  }
};
