import { Fragment } from 'react';
import { BsGithub, BsInstagram, BsYoutube } from 'react-icons/bs';

import config from '../data/config.json';
import { trim } from '../utils/tools';
import Image from './image';
import Link from './link';

function SocialMediaRow() {
  return (
    <div className="flex flex-row space-x-3 text-xl">
      <Link noDefaultColours href={config.author.social.instagram}>
        <BsInstagram />
      </Link>
      <Link noDefaultColours href={config.author.social.github}>
        <BsGithub />
      </Link>
      <Link noDefaultColours href={config.author.social.youtube}>
        <BsYoutube />
      </Link>
    </div>
  );
}

function FooterLinksAndCopyright() {
  return (
    <div className="mt-1 mb-1 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 md:mt-0">
      {config.footer.routes.map((item, index) => {
        return (
          <Fragment key={`FOOTER-LINKS-${trim(item.name)}`}>
            <span className="footer-text-interaction">
              <Link href={item.href}>{item.name}</Link>
            </span>

            {config.footer.routes.length - 1 !== index && (
              <span className="hidden text-gray-400 dark:text-gray-500 sm:block">
                {' '}
                |{' '}
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function LicenseBadge() {
  return (
    <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
      <Image
        width={88}
        height={31}
        alt="Creative Commons License"
        src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
      />
    </a>
  );
}

export default function DefaultFooter() {
  return (
    <footer className="footer-default display-font">
      <SocialMediaRow />
      <FooterLinksAndCopyright />
      <p>
        &copy; {new Date().getFullYear()} &#x2022; {config.author.name}
      </p>
      <LicenseBadge />
    </footer>
  );
}
