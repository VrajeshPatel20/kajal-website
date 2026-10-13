import logo from "../assets/brand-logo.jpeg";
/** The supplied file is an editor screenshot. A layout crop displays the original
 * artwork without the surrounding selection border; source pixels stay untouched.
 * Parent links provide the accessible name, avoiding duplicate announcements. */
export function BrandLogo() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src={logo} width="1406" height="1246" alt="" decoding="async" />
    </span>
  );
}
