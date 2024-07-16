import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
describe('<Blog />', () => {

  test('renders only title and author but not url and likes', () => {
    const blog = {
      title: 'Testing is very important',
      author: 'Julio Verne',
      url: 'https://es.wikipedia.org/wiki/Julio_Verne',
      likes: 5,
      user: {
        name: 'javi92'
      }
    }

    const element = render(<Blog blog={blog}/>)
    const likesContent = element.queryByText('Likes')
    const urlContent = element.queryByText(blog.url, { exact: false })
    expect(element.container).toHaveTextContent('Testing is very important Julio Verne')
    //screen.debug(urlContent)
    expect(urlContent).not.toBeInTheDocument()
    expect(likesContent).not.toBeInTheDocument()
  })

  test('renders likes and url when click button show', async () => {
    const blog = {
      title: 'Another interesting blog about uhmm testing',
      author: 'Kevin Bacon',
      url: 'https://es.wikipedia.org/wiki/Julio_Verne',
      likes: 5,
      user: {
        name: 'javi92'
      }
    }

    const element = render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const showButton = screen.getByText('show')

    await user.click(showButton)
    const urlContent = element.queryByText(blog.url, { exact: false })
    const likesContent = element.queryByText('Likes', { exact: false })

    screen.debug(likesContent)

    expect(urlContent).toBeInTheDocument()
    expect(likesContent).toBeInTheDocument()
  })

  test('ahora voy espera un momento', async () => {
    const blog = {
      title: 'Another interesting blog about uhmm testing',
      author: 'Kevin Bacon',
      url: 'https://es.wikipedia.org/wiki/Julio_Verne',
      likes: 5,
      user: {
        name: 'javi92'
      }
    }
    const likeHandler = vi.fn()

    render(<Blog blog={blog} handleLike={likeHandler}/>)
    const user = userEvent.setup()
    await user.click(screen.getByText('show'))

    const likesButton = screen.getByText('👍')
    await user.click(likesButton)
    await user.click(likesButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
