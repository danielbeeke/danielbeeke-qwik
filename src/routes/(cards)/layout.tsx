import { component$, Slot } from "@builder.io/qwik";
import { useDocumentHead } from '@builder.io/qwik-city';
import '../../scss/home-card.scss'

export default component$(() => {
  const { frontmatter: { header, image } } = useDocumentHead();
  
  return (
    <div class="home-card lightnet">
      <header>
        <div class="left" dangerouslySetInnerHTML={header}></div>

        <div class="right-wrapper">
          <img src={image} class="right" />
        </div>
      </header>

      <main>
        <Slot />
      </main>
    </div>
  );
});
