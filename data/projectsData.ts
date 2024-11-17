interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  // {
  //   title: 'A Search Engine',
  //   description: `What if you could look up any information in the world? Webpages, images, videos
  //   and more. Google has many features to help you find exactly what you're looking
  //   for.`,
  //   imgSrc: '/static/images/google.png',
  //   href: 'https://www.google.com',
  // },
  {
    title: 'Rinha SO: Windows vs Linux',
    description: `Descubra como Windows e Linux se comparam em diferentes contextos, como programação,
    design, produtividade e mais. Nesta série, exploramos os prós e contras de cada sistema para ajudá-lo
    a decidir qual é o melhor para suas necessidades.`,
    imgSrc: '/static/images/publicacoes/projectos/rinha-so-linux-vs-windows.jpg',
    href: '/blog/rinha-so-linux-vs-windos/rinha-so-linux-vs-windows', 
  }
  // {
  //   title: 'The Time Machine',
  //   description: `Imagine being able to travel back in time or to the future. Simple turn the knob
  //   to the desired date and press "Go". No more worrying about lost keys or
  //   forgotten headphones with this simple yet affordable solution.`,
  //   imgSrc: '/static/images/time-machine.jpg',
  //   href: '/blog/the-time-machine',
  // },
]

export default projectsData
