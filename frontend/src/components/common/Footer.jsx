import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-outline bg-white pb-12 pt-24">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1">
            <h2 className="mb-8 text-2xl font-extrabold text-primary">StudyBridge</h2>
            <p className="mb-8 text-sm leading-relaxed text-text-muted">
              Defining the future of academic discovery through technology and expert human-centric mentorship.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-primary transition-all hover:bg-primary hover:text-white"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-primary transition-all hover:bg-primary hover:text-white"
              >
                <span className="material-symbols-outlined text-xl">camera</span>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h6 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-primary">Explore</h6>
            <ul className="space-y-4 text-sm font-medium text-text-muted">
              <li><Link to="/quiz" className="transition-colors hover:text-accent">National Exams</Link></li>
              <li><Link to="/universities" className="transition-colors hover:text-accent">Study Destinations</Link></li>
              <li><Link to="/universities" className="transition-colors hover:text-accent">Premier Colleges</Link></li>
              <li><Link to="/scholarships" className="transition-colors hover:text-accent">Scholarship Hub</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h6 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-primary">Resources</h6>
            <ul className="space-y-4 text-sm font-medium text-text-muted">
              <li><a href="#" className="transition-colors hover:text-accent">Admission Blog</a></li>
              <li><a href="#" className="transition-colors hover:text-accent">Career Assessment</a></li>
              <li><a href="#" className="transition-colors hover:text-accent">Success Stories</a></li>
              <li><a href="#" className="transition-colors hover:text-accent">Newsletter</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h6 className="mb-8 text-xs font-black uppercase tracking-[0.2em] text-primary">Contact</h6>
            <div className="space-y-6 text-sm text-text-muted">
              <p className="leading-relaxed">3rd Floor, C Wing, Vega Center, Pune, MH 411042</p>
              <p className="font-bold text-primary">+91 95958 86633</p>
              <p className="font-bold text-primary">hello@studybridge.edu</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-outline pt-12 md:flex-row">
          <p className="text-xs font-semibold text-text-muted">© 2024 StudyBridge Academic Solutions Pvt Ltd.</p>
          <div className="flex gap-10 text-xs font-bold text-text-muted">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Institutional Access</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;