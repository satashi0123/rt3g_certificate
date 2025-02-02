import * as React from "react";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";

import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import FormControl from "@mui/material/FormControl";
import { createContext } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

let theme = createTheme({
  spacing: 8,
});

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: "#026E80",
      },
      name: "salmon",
    }),
  },
});

const PostContext = createContext();

export default function SimpleContainer() {
  const [fullName, setFullname] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  const handleImageLoad = () => {
    setIsLoaded(true);
    console.log("Image fully loaded!");
  };

  function processFullName(fullName) {
    // Trim spaces at the start and end
    let trimmedName = fullName.trim();

    // Capitalize the first letter of each word
    let capitalizedName = trimmedName
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");

    // Convert to URL encoded string
    console.log(capitalizedName);
    let urlEncoded = encodeURIComponent(capitalizedName);
    console.log("encoded Url");
    console.log(urlEncoded);

    return urlEncoded;
  }

  const uploadImageToCloudinary = async (file, folderName) => {
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
      console.log("data");
      console.log(data);
      return data.display_name;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const folderName = "rt3g_cn/avatar_upload";
      const publicId = await uploadImageToCloudinary(image, folderName);
      const imageEncodedUrl = processFullName(fullName);
      const font = "poppins"; // vlgreatvibes.otf
      const fontSize = "60";

      const certificateUrl = `https://res.cloudinary.com/btccongnghe3goc/image/upload/l_text:${font}_${fontSize}_bold_center:${imageEncodedUrl},co_rgb:E60012,x_480,y_-400,c_fit,w_650/l_rt3g_cn:avatar_upload:${publicId},c_thumb,r_max,h_400,w_400,x_480,y_-40,bo_4px_solid_rgb:44889B/v1738059114/rt3g_runing-challenge-tet-2025_bvtik5.jpg`;
      setImageUrl(certificateUrl);
      setIsLoaded(false);
      console.log(certificateUrl);
    } catch (error) {
      setError("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
      setImage(null);
    }
  };

  function insertString(originalUrl, insertPart, after) {
    const insertPosition = originalUrl.indexOf(after) + after.length;
    return (
      originalUrl.slice(0, insertPosition) +
      insertPart +
      originalUrl.slice(insertPosition)
    );
  }

  const handleDownload = (imageUrl) => {
    // Create a temporary link to trigger the download
    const fileName = "rt3g_cn-tet-2025";
    // Insert Flag to get download direct link
    const insertAttchmentFlag = `/f_jpg/fl_attachment:${fileName}`;
    const modifiedUrl = insertString(imageUrl, insertAttchmentFlag, "/upload");
    const link = document.createElement("a");
    link.href = modifiedUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <PostContext.Provider value={{}}>
          <GlobalStyles
            styles={{
              html: { fontSize: "62.5%" },
              body: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                backgroundColor: "#b3d4d9 !important",
                padding: "16px",
              },
            }}
          />
          <CssBaseline />
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
              bgcolor: "#fff",
              borderTop: "8px solid #026E80",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                height: "100dvh",
              }}
            >
              <Container maxWidth="sm" sx={{}}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    textTransform: "uppercase",
                    height: "12.5rem",
                    fontSize: "3rem",
                    color: "#006f84",
                    fontWeight: "bold",
                  }}
                >
                  Chứng nhận challenges running during tet 2025
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "12.5rem",
                    color: "#343a40",
                    fontSize: "1.28rem",
                  }}
                >
                  Chúc mừng bạn đã hoàn thành xuất sắc thử thách
                  &quot;Challenges Running During Tết 2025&quot;! 🎉✨<br></br>
                  Sự nỗ lực và quyết tâm của bạn thật đáng ngưỡng mộ. Đây không
                  chỉ là thành quả của sức bền mà còn là tinh thần kiên trì vượt
                  qua chính mình. Hãy tiếp tục duy trì năng lượng tích cực này
                  trong năm mới nhé! 🏃‍♂️💪🎇<br></br>
                  Chúc bạn một năm 2025 thật nhiều thành công và sức khỏe! 🧧🌟
                </Typography>
              </Container>
              <FormControl
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Container>
                  {" "}
                  <Container
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "12.5rem",
                    }}
                  >
                    <TextField
                      required
                      id="outlined-required"
                      label="Họ & tên của bạn"
                      variant="outlined"
                      value={fullName}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </Container>
                  <Container
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      component="label"
                      color="salmon"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Tải lên Avatar của bạn
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        multiple
                      />
                    </Button>
                  </Container>
                </Container>

                <Container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "1.6rem",
                    height: "12.5rem",
                  }}
                >
                  <Button
                    color="salmon"
                    variant="contained"
                    onClick={handleUpload}
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Tạo chứng nhận"}
                  </Button>

                  <Container
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "1.6rem",
                      height: "1rem",
                    }}
                  >
                    {error ? (
                      <Typography
                        variant="paragraph"
                        gutterBottom
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#e03131",
                        }}
                      >
                        {error}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Container>
                </Container>
              </FormControl>

              <Container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "25rem",
                  position: "relative",
                }}
              >
                {imageUrl ? (
                  <img
                    height="100%"
                    src={imageUrl}
                    alt="chungnhan_rt3g_tet_2025"
                    onLoad={handleImageLoad}
                  />
                ) : (
                  ""
                )}
                {!isLoaded || loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                    }}
                  >
                    <CircularProgress color="salmon" />
                  </Box>
                ) : (
                  ""
                )}
              </Container>
              <Container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "12.5rem",
                }}
              >
                {imageUrl && isLoaded ? (
                  <Button
                    color="salmon"
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownload(imageUrl)}
                  >
                    Tải chứng nhận
                  </Button>
                ) : (
                  ""
                )}
              </Container>
              <Container>
                <Typography
                  variant="paragraph"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    color: "#026E80",
                    fontWeight: "bold",
                  }}
                >
                  Rèn Thân 3 Gốc © 2025 All Rights Reserved
                </Typography>
              </Container>
            </Box>
          </Container>
        </PostContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}
