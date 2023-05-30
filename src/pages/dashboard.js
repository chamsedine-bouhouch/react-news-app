import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "@/components/Layout";

export default function Dashboard() {
    const [news, setNews] = useState(null);

    const fetchNews = async () => {
        try {
            const response = await axios.get("https://newsapi.org/v2/everything?q=Amber&apiKey=4d4b6fd5c92744e5988b641436140953");
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
            <Box
                sx={{
                    marginTop: 16,
                }}
            >
                <Container component="main" maxWidth="xl">
                    <Head>
                        <title>Home</title>
                    </Head>

                    <Grid container spacing={2}>

                        {news?.map(article =>
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
                            </Grid>)}
                    </Grid>
                </Container>
            </Box>
        </Layout>

    );
}