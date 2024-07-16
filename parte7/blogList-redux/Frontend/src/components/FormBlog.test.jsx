import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormBlog from './FormBlog'

describe('<FormBlog />', () => {

  test('onSubmit blog is called with correct content', async() => {

    const objectBlog = {
      title: 'Typing new blog',
      author: 'George Burger',
      url: 'https://es.wikipedia.org/wiki/George'
    }

    const createBlog = vi.fn()
    const user = userEvent.setup()


    const  { container }  = render(<FormBlog addBlog={createBlog} />)

    const inputTitle = container.querySelector('#blog-title')
    const inputAuthor = container.querySelector('#blog-author')
    const inputUrl = container.querySelector('#blog-url')
    const buttonBlog = screen.getByText('Add Blog')

    await user.type(inputTitle, objectBlog.title )
    await user.type(inputAuthor, objectBlog.author)
    await user.type(inputUrl, objectBlog.url)
    await user.click(buttonBlog)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toStrictEqual(objectBlog)


    screen.debug(inputTitle)
  })
})

