import { useState } from "react";
import { Container, Box } from "@mui/material";
// import { TabContext, TabList, TabPanel } from '@mui/lab';
// import { Tab } from "@mui/material";

//SectionHeading
import SectionHeading from "Utilis/SectionHeading";

//Components
import Work from "Components/Portfolio/Work";

//Data
import Portfolios from "Data/Portfolio/Portfolio.data";

//Background
import Particle from "Assets/portfolio/particle.png";

//Styles
import styles from "Styles/Portfolio/Portfolio.styles";

const Portfolio = () => {
    // Display all items without filtering
    const [Items] = useState(Portfolios);
    
    // COMMENTED OUT: Filter functionality for future use
    // const [value, setValue] = useState('1');
    // const containerRef = useRef(null);
    
    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    
    // const filterItem = (filterItem) => {
    //     const updateItem = Portfolios.filter((curElem) => {
    //         return curElem.filter === filterItem;
    //     });
    //     setItems(updateItem);
    // }
    
    // useMemo(() => {
    //     const updateItem = Portfolios.filter((curElem) => {
    //         return curElem.filter === "web";
    //     });
    //     setItems(updateItem);
    // }, [Portfolios])

    return (
        <Container maxWidth={false} disableGutters as="section" sx={styles.Container} id="portfolio">
            <SectionHeading
                value1="The Latest Chapters "
                value2="in Our Code Story"
                border={false}
            />
            
            {/* COMMENTED OUT: Tab navigation for future use */}
            {/* <TabContext value={value}>
                <Box sx={{ mt: "3em" }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        TabIndicatorProps={{
                            style: {
                                display: "none",
                            }
                        }}
                        sx={styles.ButtonGroup}
                    >
                        <Tab label="All Work" value="0" onClick={() => setItems(Portfolios)} />
                        <Tab label="Web Development" value="1" onClick={() => filterItem('web')} />
                        <Tab label="App Development" value="2" onClick={() => filterItem('app')} />
                        <Tab label="UI/UX" value="3" onClick={() => filterItem('ui')} />
                        <Tab label="Graphic Designing" value="4" onClick={() => filterItem('graphic')} />
                        <Tab label="Animation & VFX" value="5" onClick={() => filterItem('animation')} />
                    </TabList>
                </Box>
            </TabContext> */}

            {/* Display all work items */}
            <Box sx={{ mt: "3em" }}>
                <Work works={Items} />
            </Box>

            <Box component="img" src={Particle} alt="particle" sx={styles.Particle} />
        </Container>
    );
};

export default Portfolio;