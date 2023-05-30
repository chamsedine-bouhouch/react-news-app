import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Layout from "@/components/Layout";
import Searchbar from "@/components/SearchBar";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Dashboard() {
    const router = useRouter()
    const [news, setNews] = useState(null);
    const [keyword, setKeyword] = useState(null)
    const fetchNews = async () => {
        try {
            const response = await axiosInstance.get(`/api/news?keyword=${keyword}`);
            console.log(response.data)
            setNews(response.data.articles);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }
    useEffect(() => {
        // Fetch API data here
        fetchNews()
    }, []);
    return (

        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <Box
                sx={{
                    marginTop: 16,
                }}
            >
                <Container component="main" maxWidth="xl">
                    <Box maxWidth={"sm"} margin="auto">

                        <Searchbar
                            onSubmit={(searchTerm) => {
                                setKeyword(searchTerm)
                                fetchNews()
                            }}
                            inputProps={{}}
                        />
                    </Box>

                    <Grid container spacing={2}>

                        {news ? (news.map(article =>
                            <Grid item xs={12} md={4}>

                                <Card variant="outlined" sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={article.urlToImage}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {article.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {article.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>)) : (<p>
                                Make sure to add your preferences <Link href="/settings">here</Link>
                            </p>)}
                    </Grid>
                </Container>
            </Box>
        </Layout>

    );
}