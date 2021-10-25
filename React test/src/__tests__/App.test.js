import App from "../App"
import renderer from "react-test-renderer"
import MainPage from "../components/main"
import {fireEvent, render } from "@testing-library/react"

it("renders main app",()=>{
    render(<App />)
})

it ("matches snapshot", ()=>{
    const tree= renderer.create(<App />);
    expect(tree).toMatchSnapshot();
    })

    it('should render drop button', () => {
        const {queryByTitle} =render(<MainPage/>);
        const btn = queryByTitle("drop-btn");
        expect(btn).toBeTruthy()
      });

      test("should be able to view charts", () =>{
        const mockFn = jest.fn();
        const {getByTestId} =render(<MainPage handleSubmit={mockFn} />);
        const button = getByTestId("btn");
        fireEvent.submit(button);
    
        expect(mockFn).toHaveBeenCalledTimes(0);
    })