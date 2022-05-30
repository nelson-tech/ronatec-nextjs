import ProgressBar from "@lib/progressBar"

const options = {
  size: 2,
  color: "#32de8a",
  className: "progress-bar",
  delay: 100,
}

describe("Progress Bar", () => {
  it("Should create a new ProgressBar", () => {
    const progressBar = new ProgressBar()
    expect(progressBar).toHaveProperty("start")
    expect(progressBar).toHaveProperty("finish")
  })
})
