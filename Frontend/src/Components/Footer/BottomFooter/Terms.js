import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const Terms = ({ handleClose }) => {
    return (
        <>
            <DialogTitle id="scroll-dialog-title">Terms of Service</DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                    sx={{ color: "text.primary" }}
                >
                    <div className="translations-content-container">
                        <div className="container">
                            <div className="tab-content translations-content-item en visible" id="en">
                                <h1>Terms and Conditions</h1>
                                <p>Last updated: April 15, 2025</p>
                                <p>Welcome to Blazing Render Creation Hub LLP. By using our services or accessing our website, you agree to the following terms and conditions.</p>

                                <h2>1. Company Details</h2>
                                <p><strong>Company:</strong> Blazing Render Creation Hub LLP (&quot;BRC HUB&quot;)</p>
                                <p><strong>Based in:</strong> India</p>
                                <p><strong>Focus:</strong> Web development, design, animation, branding, VFX, and digital experiences.</p>

                                <h2>2. Services</h2>
                                <p>BRC HUB provides services such as website design & development,motion graphics, VFX, UI/UX design, and social media management. All services are subject to availability and a mutual agreement on deliverables.</p>

                                <h2>3. Intellectual Property</h2>
                                <p>All materials provided by BRC HUB, including code, graphics, and animations, are the intellectual property of BRC HUB unless otherwise stated. Clients may not reuse, distribute, or modify without written consent.</p>

                                <h2>4. Payment Terms</h2>
                                <ul>
                                    <li>Projects require an upfront advance unless otherwise agreed.</li>
                                    <li>All fees are non-refundable once a project is initiated.</li>
                                    <li>Delayed payments may lead to a pause in service delivery.</li>
                                </ul>

                                <h2>5. Confidentiality</h2>
                                <p>We respect our clients&apos; confidentiality. Any materials shared with BRC HUB for project purposes are treated with strict privacy unless consent is given for public showcase.</p>

                                <h2>6. Revisions & Delivery</h2>
                                <p>Revisions are limited based on the service agreement. Final delivery will be made once all dues are cleared.</p>

                                <h2>7. Termination</h2>
                                <p>BRC HUB reserves the right to terminate services if terms are violated. Similarly, clients can terminate the agreement at any stage, subject to applicable cancellation fees and pending payments.</p>

                                <h2>8. Limitation of Liability</h2>
                                <p>BRC HUB is not liable for any indirect or consequential losses arising from the use or misuse of delivered work. We strive for excellence, but tech errors or external interruptions are beyond our control.</p>

                                <h2>9. Governing Law</h2>
                                <p>These Terms are governed by and construed in accordance with Indian laws. Any disputes will be handled in the jurisdiction where BRC HUB is registered.</p>

                                <h2>10. Updates to Terms</h2>
                                <p>We may update these Terms at any time. Changes will be communicated on our website, and continued use of our services implies agreement with the updated terms.</p>

                                <h2>11. Contact Us</h2>
                                <p>If you have any questions about these Terms and Conditions, you can reach us at:</p>
                                <ul>
                                    <li>Email: <strong>info@thebrchub.tech</strong></li>
                                    <li>Instagram: <a href="https://instagram.com/thebrchub" target="_blank" rel="noreferrer">instagram.com/thebrchub</a></li>
                                    <li>Website: <a href="https://thebrchub.tech" target="_blank" rel="noreferrer">www.thebrchub.tech</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleClose}>Okay</Button>
            </DialogActions>
        </>
    );
};

export default Terms;
