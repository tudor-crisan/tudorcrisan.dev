
export const metadata = {
  title: "Terms of Service | Tudor Crișan",
  description: "Terms and conditions for working with Tudor Crișan.",
};

export default function TermsPage() {
  return (
    <section className="pt-40 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12">
            Terms of <span className="text-primary-gradient">Service</span>
          </h1>
          
          <div className="glass p-8 md:p-12 rounded-[2rem] space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                These terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of Tudor Crișan. 
                The content is protected by copyright, trademark, and other laws of both Romania and foreign countries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Professional Services</h2>
              <p>
                Any engagement for professional consulting or transformation advisory services will be governed by a separate, specific agreement 
                outlining scope, timelines, and compensation. The information on this website is for informational purposes only 
                and does not constitute a binding contract for services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitation of Liability</h2>
              <p>
                In no event shall Tudor Crișan be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from 
                your access to or use of or inability to access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of Romania, without regard to its conflict 
                of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Changes</h2>
              <p>
                I reserve the right, at my sole discretion, to modify or replace these Terms at any time. What constitutes a 
                material change will be determined at my sole discretion.
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
