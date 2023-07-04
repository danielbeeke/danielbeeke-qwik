import { component$, Slot } from '@builder.io/qwik';
import { Navigation } from '~/components/navigation/Navigation';

export default component$(() => {
  return (
    <div window:onScroll$={(event) => {
      window.scrollY ? document.body.classList.add("scrolled") : document.body.classList.remove("scrolled")
    }}>
    <Slot />
    <Navigation />
    </div>
  );
});