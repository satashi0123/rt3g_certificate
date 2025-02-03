import * as React from "react";
import { useState, useEffect } from "react";
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

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

import uploadImageToCloudinary from "./services/apiCloudinary";
import capitalizeFullname from "./utils/capitalizeFullname";
import insertString from "./utils/insertString";
import { useRef } from "react";

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
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 14,
  },
});

theme = responsiveFontSizes(theme);

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

  const targetRef = useRef(null);

  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    handleScroll();
    // console.log("Image fully loaded!");
  };

  const handleUpload = async () => {
    if (!fullName) {
      setError("Xin vui lòng nhập họ và tên bạn.");
      return;
    }
    if (!image) {
      setError("Xin vui lòng tải lên avatar của bạn.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const folderName = "rt3g_cn/avatar_upload";
      const publicId = await uploadImageToCloudinary(image, folderName);
      const imageEncodedUrl = capitalizeFullname(fullName);
      const font = "poppins"; // vlgreatvibes.otf
      const fontSize = "60";

      const certificateUrl = `https://res.cloudinary.com/btccongnghe3goc/image/upload/l_text:${font}_${fontSize}_bold_center_line_spacing_-20:${imageEncodedUrl},co_rgb:E60012,x_520,y_-400,c_fit,w_700/l_rt3g_cn:avatar_upload:${publicId},c_thumb,r_max,h_420,w_420,x_480,y_-40,bo_4px_solid_rgb:44889B/v1738059114/rt3g_runing-challenge-tet-2025_bvtik5.jpg`;
      setImageUrl(certificateUrl);
      setIsLoaded(false);

      // console.log(certificateUrl);
    } catch (error) {
      setError("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
      setImage(null);
    }
  };

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
              html: {},
              body: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
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
              p: {
                xs: 2,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 4,
              },
              bgcolor: "#fff",
              borderTop: "8px solid #026E80",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: {
                  xs: 300,
                  sm: 500,
                  md: 600,
                  lg: 600,
                  xl: 700,
                },
              }}
            >
              <Container>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    textTransform: "uppercase",
                    minHeight: {
                      xs: "6.25rem",
                      sm: "6.25rem",
                      md: "6.25rem",
                      lg: "9.375rem",
                      xl: "12.5rem",
                    },
                    color: "#006f84",
                    fontWeight: "bold",
                    marginBottom: {
                      xs: "2rem",
                      sm: "2rem",
                      md: "3rem",
                      lg: "4rem",
                      xl: "4rem",
                    },
                  }}
                >
                  Chứng nhận challenges running during tet 2025
                </Typography>
                <img
                  width="100%"
                  src="/rt3g_tet-2025-running-challenge-banner.jpg"
                  alt="chungnhan_rt3g_tet_2025"
                />
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: {
                      xs: "6.25rem",
                      sm: "6.25rem",
                      md: "6.25rem",
                      lg: "9.375rem",
                      xl: "12.5rem",
                    },
                    color: "#343a40",
                    marginBottom: "4rem",
                    marginTop: "2rem",
                  }}
                >
                  Chúc mừng bạn đã hoàn thành xuất sắc thử thách
                  &quot;Challenges Running During Tết 2025&quot;! <br></br>
                  <br></br>
                  Sự nỗ lực và quyết tâm của bạn thật đáng ngưỡng mộ! Đây không
                  chỉ là minh chứng cho sức bền mà còn thể hiện tinh thần kiên
                  trì, không ngừng vượt qua giới hạn của bản thân. Hãy tiếp tục
                  duy trì năng lượng tích cực này trong năm mới nhé!<br></br>
                  <br></br>
                  Để ghi nhận thành tích xuất sắc này, chúng tôi xin gửi đến bạn
                  Chứng nhận Hoàn thành như một lời tôn vinh những cố gắng không
                  ngừng nghỉ của bạn.<br></br>
                  <br></br>
                  Chúc bạn một năm 2025 thật nhiều thành công, sức khỏe và những
                  bước chạy đầy cảm hứng!
                </Typography>
              </Container>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  minHeight: {
                    xs: "6.25rem",
                    sm: "6.25rem",
                    md: "6.25rem",
                    lg: "9.375rem",
                    xl: "12.5rem",
                  },
                }}
              >
                <Container>
                  <Container
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      required
                      color="salmon"
                      id="outlined-required"
                      label="Họ & tên của bạn"
                      variant="outlined"
                      value={fullName}
                      onChange={(e) => setFullname(e.target.value)}
                      sx={{ width: "300px", marginBottom: "2rem" }}
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
                      size="small"
                      component="label"
                      color="salmon"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      sx={{ marginBottom: "2rem" }}
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
                      minHeight: "2rem",
                    }}
                  >
                    <Typography
                      variant="paragraph"
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#e03131",
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </Typography>
                  </Container>
                </Container>
              </Box>
              {imageUrl ? (
                <>
                  <Container
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: {
                        xs: "12.5rem",
                        sm: "12.5rem",
                        md: "12.5rem",
                        lg: "18.75rem",
                        xl: "25rem",
                      },
                      position: "relative",
                    }}
                  >
                    <img
                      width="100%"
                      src={imageUrl}
                      alt="chungnhan_rt3g_tet_2025"
                      onLoad={handleImageLoad}
                    />

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
                      minHeight: {
                        xs: "6.25rem",
                        sm: "6.25rem",
                        md: "6.25rem",
                        lg: "9.375rem",
                        xl: "12.5rem",
                      },
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
                </>
              ) : (
                ""
              )}
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <img
                  ref={targetRef}
                  width="100px"
                  src="/rt3g_logo.png"
                  alt="rt3g_logo"
                />
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    fontSize: "0.6rem",
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
