import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const Privacy = ({ handleClose }) => {
    return (
        <>
            <DialogTitle id="scroll-dialog-title">Privacy Policy</DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                    sx={{ color: "text.primary" }}
                >
                    <h1>Privacy Policy for Blazing Render Creation Hub LLP</h1>
                    <p>At BRC HUB (Blazing Render Creation Hub LLP), accessible from <a href="https://thebrchub.com" target="_blank">thebrchub.com</a>, your privacy is very important to us. This Privacy Policy outlines how we collect, use, and safeguard your information when you interact with our website or services.</p>

                    <h2>1. Consent</h2>
                    <p>By using our website or services, you consent to the terms of this Privacy Policy and agree to our practices described herein.</p>

                    <h2>2. Information We Collect</h2>
                    <p>We may collect personal information including your name, email address, phone number, company name, and any details shared via forms or direct communication.</p>
                    <p>Non-personal data such as browser type, IP address, and pages visited may also be collected for analytics and website optimization.</p>

                    <h2>3. How We Use Your Information</h2>
                    <ul>
                        <li>To provide and manage our services</li>
                        <li>To respond to inquiries and client communication</li>
                        <li>To improve user experience on our website</li>
                        <li>To send updates, offers, or promotional content (only if opted in)</li>
                        <li>To maintain website security and prevent misuse</li>
                    </ul>

                    <h2>4. Third-Party Services</h2>
                    <p>We may use third-party tools like Google Analytics or payment gateways. These tools may collect data under their own privacy policies. We recommend reviewing their terms separately.</p>

                    <h2>5. Data Security</h2>
                    <p>We implement appropriate technical and organizational security measures to protect your personal data from unauthorized access, misuse, or loss.</p>

                    <h2>6. Cookies</h2>
                    <p>We use cookies to personalize your experience, analyze site traffic, and offer relevant content. You can choose to disable cookies via your browser settings.</p>

                    <h2>7. Data Retention</h2>
                    <p>We retain personal data only as long as necessary to fulfill the purposes outlined in this policy, unless otherwise required by law.</p>

                    <h2>8. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access or update your personal data</li>
                        <li>Request data deletion (subject to conditions)</li>
                        <li>Withdraw consent at any time</li>
                        <li>File a complaint with a data protection authority</li>
                    </ul>
                    <p>To exercise any of these rights, contact us using the details below.</p>

                    <h2>9. Children's Privacy</h2>
                    <p>Our services are not directed at individuals under the age of 13. We do not knowingly collect personal data from children. If such data is discovered, we will delete it immediately.</p>

                    <h2>10. Changes to This Policy</h2>
                    <p>We may update this Privacy Policy occasionally. Any changes will be posted on this page with a revised "Last Updated" date.</p>

                    <h2>11. Contact Us</h2>
                    <p>If you have any questions or concerns about this Privacy Policy, reach out to us at:</p>
                    <ul>
                        <li>Email: <strong>contact@brchub.in</strong></li>
                        <li>Instagram: <a href="https://instagram.com/thebrchub" target="_blank">instagram.com/thebrchub</a></li>
                        <li>Website: <a href="https://thebrchub.com" target="_blank">www.thebrchub.com</a></li>
                    </ul>
                    <p><strong>Last updated:</strong> April 15, 2025</p>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleClose}>Okay</Button>
            </DialogActions>
        </>
    );
};

export default Privacy;
