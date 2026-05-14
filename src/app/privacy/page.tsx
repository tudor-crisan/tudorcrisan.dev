
export const metadata = {
  title: "Privacy Policy | Tudor Crișan",
  description: "Privacy policy for tudorcrisan.dev.",
};

export default function PrivacyPage() {
  return (
    <section className="pt-40 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12">
            Privacy <span className="text-primary-gradient">Policy</span>
          </h1>
          
          <div className="glass p-8 md:p-12 rounded-[2rem] space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Data Collection</h2>
              <p>
                This website collects personal data only when voluntarily submitted through the contact forms or direct email communication. 
                This may include your name, email address, and any information provided in your message.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use of Data</h2>
              <p>
                The information collected is used solely to respond to your inquiries and provide the requested professional services. 
                I do not sell, rent, or lease my customer lists to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Analytics</h2>
              <p>
                I use Vercel Analytics and Speed Insights to understand how visitors interact with the site. This data is 
                anonymized and helps improve the user experience and site performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Cookies</h2>
              <p>
                This site uses essential cookies for basic functionality and analytics. You can set your browser to refuse 
                all or some browser cookies, but some parts of this site may then be inaccessible or not function properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Security</h2>
              <p>
                The security of your data is important to me, but remember that no method of transmission over the Internet, 
                or method of electronic storage is 100% secure. I strive to use commercially acceptable means to protect 
                your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Information</h2>
              <p>
                For any questions regarding this Privacy Policy, please contact me through the contact form on the home page.
              </p>
            </section>

            <p className="text-sm italic pt-8 border-t border-border/40">
              Last updated: May 14, 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
