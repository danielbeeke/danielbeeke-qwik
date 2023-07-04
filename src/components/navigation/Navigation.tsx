import { $, component$ } from "@builder.io/qwik";
import { useContent, useLocation, useNavigate } from '@builder.io/qwik-city';
import type { QwikMouseEvent } from '@builder.io/qwik';

import './navigation.scss'

export const Navigation = component$(() => {
  const { menu } = useContent()
  const loc = useLocation();
  const nav = useNavigate()

  if (!menu?.items) return null

  const currentItem = menu.items.find(item => item.href === loc.url.pathname)
  const index = currentItem ? menu.items.indexOf(currentItem) : 0

  const previous = menu.items.at(index - 1)
  const next = menu.items.at(index + 1 >= menu.items.length ? 0 : index + 1)

  const goTo = $((event: QwikMouseEvent<HTMLAnchorElement, MouseEvent>, element: HTMLAnchorElement) => {
    const path = element.getAttribute('href')!
    const classToAdd = element.classList.contains('left') ? 'went-right' : 'went-left'
    const cameClass = element.classList.contains('left')? 'came-right' : 'came-left'

    document.body.addEventListener('animationend', () => {
      nav(path)

      document.body.classList.remove(classToAdd)
  
      document.body.addEventListener('animationend', () => {
        document.body.classList.remove(cameClass)
      })
  
      document.body.classList.add(cameClass)
    }, {
      once: true
    })
    document.body.classList.add(classToAdd)
  })

  return (
    <div class="navigation">
      <a preventdefault:click onClick$={goTo} href={previous?.href} class="left nav-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;{previous?.text}</span>
      </a>
      <h3 onClick$={() => {
        const header = document.querySelector('main h1')
        header?.scrollIntoView({
          behavior: 'smooth'
        })
      }} class="current-page">{currentItem?.text}</h3>
      <a preventdefault:click onClick$={goTo} href={next?.href} class="right nav-button">
        <span>{next?.text}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
      </a>
    </div>
  );
});
