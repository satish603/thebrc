const styles = {
    Container: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        py: {
            xxl: "14px",
            xxs: "10px"
        },
        zIndex: "999",
        transition: "all 0.3s ease-in-out", // smooth height transition
        "&.sticky": {
            backgroundColor: "background.default",
            boxShadow: theme => `0 0 20px ${theme.palette.primary.box_shadow_black}`,
            py: {
                xxl: "2px", // reduced padding for sticky
                xxs: "1px"
            }
        }
    }
};

export default styles;
