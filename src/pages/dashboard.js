import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Checkbox, Chip, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Layout from "@/components/Layouts/AppLayout";
import Searchbar from "@/components/SearchBar";
import Link from "next/link";
import { useNews } from "@/hooks/news";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Dashboard() {
    const { categories, sources, fetchCategories, fetchSources } = useNews()
    const [category, setCategory] = useState(null);
    const [news, setNews] = useState(null);
    const [keyword, setKeyword] = useState(null)
    const fetchNews = async () => {
        try {
            const response = await axiosInstance.post(`/api/news`, { keyword: keyword, category: category });
            setNews(response.data.articles);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        // await axiosInstance.post(`/api/news`, { keyword: keyword, category: category })
        //     .then(response => setNews(response.data.articles))
        //     .catch(error => console.error('Error fetching data:', error));

    }


    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        fetchNews()
    }

    useEffect(() => {
        // Fetch API data here
        fetchNews()
        fetchCategories()
        fetchSources()
    }, []);
    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <Box
                sx={{
                    marginTop: 12,
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
                    <Box maxWidth={"sm"} margin="auto" marginBottom={4}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Filter</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Grid item md={8}>
                                    <FormControl>
                                        <FormLabel id="demo-controlled-radio-buttons-group">Filter By Categories</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={category}
                                            onChange={handleCategoryChange}
                                        >
                                            {categories?.map(category => <FormControlLabel value={category} control={<Radio />} label={category} />)}
                                            {/* <FormControlLabel value="male" control={<Radio />} label="Male" /> */}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item md={4}>
                                    <FormControl component="fieldset" variant="standard">
                                        <FormLabel component="legend">Filter By Source</FormLabel>
                                        <FormGroup row>

                                            {sources?.map(source => <FormControlLabel required control={<Checkbox />} label={source.name} />)}


                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                    </Box>
                    <Grid container spacing={2}>

                        {news ? (news.map(article =>
                            <Grid
                                item
                                justifyContent="center"
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                            >


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
                            </Grid>)) : (
                            <Grid item xs={12} md={4}><p>
                                Make sure to add your preferences <Link href="/settings">here</Link>
                            </p>
                            </Grid>)}
                    </Grid>
                </Container>
            </Box>
        </Layout>

);
}