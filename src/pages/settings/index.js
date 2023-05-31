import Layout from "@/components/Layouts/AppLayout";
import { Box, Container } from "@mui/material";
export default function Settings() {
    return (
        <Layout>

            <Container component="main" maxWidth="xl">

                <Box
                    sx={{
                        marginTop: 16,
                    }}
                >   Settings
                </Box>
            </Container>

        </Layout>
    );
}