export const fetchSource = async ({ fileName }: { fileName: string }) => {
  try {
    const response = await fetch(`/api/read-source?fileName=${fileName}`);
    if (!response.ok) {
      throw new Error("Failed to fetch source code");
    }
    const { source } = await response.json();
    console.log("Fetched source:", source);

    return source;
    
  } catch (error) {
    console.error("Error:", error);
  }
};
