App = {
  web3Provider: null,
  contracts: {},
  instance: null,
  address: '',
  init: () => {
    // Load pets.
    $.getJSON('./Election.json',  (data) => {
      // console.log(data)
      App.contracts.Election = TruffleContract(data)
      App.initWeb3();
    });

  },

  initWeb3: () => {
    App.web3Provider = web3.currentProvider
    App.contracts.Election.setProvider(App.web3Provider)    
    web3 = new Web3(web3.currentProvider)
    web3.eth.getCoinbase((e, ad) => {
      address = ad
      document.getElementById('address').innerHTML = ad
    })
    return App.initContract();
  },

  initContract: async () => {
    /*
     * Replace me...
     */
    // console.log(App.contracts.Election)
    App.instance = await App.contracts.Election.deployed()
    const candidates = [],
      candidatesCount = await App.instance.candidatesCount()
    for (let i = 1; i <= candidatesCount; i++) {
      // console.log(await instance.candidates(i))
      const candidates = await App.instance.candidates(i)
      const str = '<tr> <td>'
        + candidates[0].valueOf() 
        +'</td> <td>' 
        + candidates[1] 
        + '</td> <td>'
        + candidates[2].valueOf() + '</td> <td>'
        + ' <button onclick="App.vote(' + candidates[0].valueOf() + ')">Vote</button> </td> </tr>'

        document.getElementById('content').innerHTML += str
    }
  },
  vote: (i) => {
    console.log(i)
    App.instance.vote(i, {from: App.address}).then(console.log)
  }

};

$(() => {
  $(window).load(() => {
    App.init();
  });
});