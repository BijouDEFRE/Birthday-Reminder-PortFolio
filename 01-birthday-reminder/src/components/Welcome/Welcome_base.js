
      
    // import the array from "data"
    const [people, setPeople] = useState(data);
    console.log(people);


<main>
            <div className="container">
              <h3>{people.length} birthdays today</h3>
                {/* <Logout/> */}
                <List people={people}/>
                {/* here we recup the new state for iterate new array */}
                <Button onClick={() => setPeople([])}>
                  clear all
                </Button>
            </div>
          </main>