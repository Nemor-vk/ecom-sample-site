import supabase from "./supabaseConfig";


export async function uploadFiles(files: File[]) {
    // const uploadedFiles = [];
  
    for (const file of files) {

        console.log(file)
      const filePath = `products/${file.name}`; // Define the file path in the bucket
      const { data, error } = await supabase.storage
        .from("images") // Replace with your bucket name
        .upload(filePath, file);
  
      if (error) {
        console.error("Error uploading file:", error);
      } else {
        console.log("File uploaded:", data);
        // uploadedFiles.push({
        //   url: `${supabase.storage.from("images").getPublicUrl(filePath).data.publicUrl}`,
        //   altText: file.name,
        // });
      }
    }

  }
