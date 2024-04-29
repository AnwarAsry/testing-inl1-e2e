describe('Movies Website', () => {

    beforeEach(() => {
        cy.visit("/");
    })

    it('Get movies from mock data API', () => {
        cy.intercept("http://www.omdbapi.com/*", {
            Search: [{
                Title: "Star",
                imdbID: "string",
                Type: "string",
                Poster: "string",
                Year: "string",
            },{
                Title: "Star",
                imdbID: "string",
                Type: "string",
                Poster: "string",
                Year: "string",
            }]
        }).as("getMovies");
        
        const searchText = "Star";

        cy.get("input#searchText").type(searchText + "{enter}");

        cy.wait("@getMovies").its("request.url").should("include", searchText)

        cy.get("#movie-container > .movie").should("have.length", 2);
    })
    it('Get movies from API with textValue', () => {
        const searchText = "Star";

        cy.get("input#searchText").type(searchText + "{enter}");

        cy.get("#movie-container > .movie").should("have.length.above", 1);
    })
    it('Get movies from API without textValue', () => {
        const msg = "Inga sökresultat att visa";

        cy.get("input#searchText").type("{enter}");

        cy.get("#movie-container").should("have.text", msg);
    })
})