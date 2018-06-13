const Election = artifacts.require('./Election.sol')

contract("Election", (accs) => {
  it("initializes 2 candidates",async () => {
    const instance = await Election.deployed()
    assert.equal(await instance.candidatesCount(), 2)
  })

  it("init the candidates correct values", async () => {
    const instance = await Election.deployed()
    const candidate1 = await instance.candidates(1)
    const candidate2 = await instance.candidates(2)
    
    // test candidate 1
    assert.equal(candidate1[0], 1, "correct id")
    assert.equal(candidate1[1], "Nguyen Van A", "correct name")
    assert.equal(candidate1[2], 0, "correct vote")
    assert.equal(candidate2[0], 2, "correct id")
    assert.equal(candidate2[1], "Nguyen Van B", "correct name")
    assert.equal(candidate2[2], 0, "correct vote")
    
  })
})