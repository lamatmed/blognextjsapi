export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg">
                <Sparkles className="h-6 w-6 mr-2" />
                <span className="text-xl font-bold">Blog Modern</span>
              </div>
            </div>
            <p className="text-indigo-200 max-w-md">
              Partagez vos pensées et idées avec le monde. Une plateforme moderne pour les créateurs de contenu.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-indigo-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-300 hover:text-white transition-all duration-300 transform hover:scale-110">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Navigation</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-base text-indigo-200 hover:text-white transition-colors duration-300">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-indigo-200 hover:text-white transition-colors duration-300">
                    Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-indigo-200 hover:text-white transition-colors duration-300">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-indigo-200 hover:text-white transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Légal</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="text-base text-indigo-200 hover:text-white transition-colors duration-300">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-indigo-200 hover:text-white transition-colors duration-300">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-indigo-200 hover:text-white transition-colors duration-300">
                    Politique des cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-indigo-200 hover:text-white transition-colors duration-300">
                    Mentions légales
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Restez informé</h3>
            <p className="mt-4 text-indigo-200">
              Abonnez-vous à notre newsletter pour recevoir les derniers articles et actualités.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">Adresse email</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border border-transparent bg-white/10 px-4 py-2 text-base text-white placeholder-indigo-300 focus:border-white focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Votre email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-base font-medium text-white hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300"
                >
                  S'abonner
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-indigo-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-indigo-400">
            &copy; {new Date().getFullYear()} Blog Modern. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-indigo-400 hover:text-white transition-colors duration-300">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-indigo-400 hover:text-white transition-colors duration-300">
              Politique de confidentialité
            </a>
            <a href="#" className="text-indigo-400 hover:text-white transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}