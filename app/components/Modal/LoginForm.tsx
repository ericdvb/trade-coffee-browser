interface LoginFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface LoginForm extends HTMLFormElement{
  readonly elements: LoginFormElements;
}

function LoginForm(): React.ReactElement {
  const submitHandler = (e: React.FormEvent<LoginForm>) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`, {
      method: 'post',
      body: JSON.stringify({
        username: e.currentTarget.elements.username.value,
        password: e.currentTarget.elements.password.value,
      })
    });
  }

  return <form action='/api/v0/auth' method="POST" onSubmit={submitHandler}>
    <div className="mb-12">
      <label htmlFor="" className="mb-[10px] block text-base font-medium text-dark dark:text-white">
        Username
      </label>
      <input type="text" name="username" placeholder="Username" className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2" />
      <label htmlFor="" className="mb-[10px] block text-base font-medium text-dark dark:text-white">
        Password
      </label>
      <input type="password" name="password" placeholder="Password" className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2" />
      <div className="mt-6 mb-10">
        <input
          type="submit"
          value="Sign In"
          className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90 bg-maroon"
        />
      </div>
    </div>
  </form>;

}

export default LoginForm;
