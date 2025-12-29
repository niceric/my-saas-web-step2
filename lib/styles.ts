// Design tokens and reusable styles
export const styles = {
  button: {
    primary: 'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
    link: 'text-indigo-600 hover:text-indigo-500 font-semibold',
  },
  input: {
    base: 'relative block w-full border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
    roundedTop: 'rounded-t-md',
    roundedBottom: 'rounded-b-md',
    rounded: 'rounded-md',
  },
  card: {
    base: 'rounded-lg shadow-md bg-white p-6',
    yellow: 'bg-yellow-50 p-4 rounded-lg border border-yellow-200 shadow-sm',
    white: 'bg-white p-4 rounded-lg shadow-sm border border-indigo-100',
  },
  container: {
    centered: 'flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6',
    page: 'min-h-screen bg-gray-50',
  },
}
