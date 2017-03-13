package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func main() {
	http.HandleFunc("/", handleRoot)

	http.HandleFunc("/api", handleApi)

	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static", fs))

	http.ListenAndServe(":8080", nil)
}

func handleApi(w http.ResponseWriter, r *http.Request) {
	fmt.Println("a;sdklfjas;kdfj")
	res := []byte("This is my response")
	w.Write(res)
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	files := []string{
		"templates/index.tmpl",
		"templates/hand.tmpl",
		"templates/nextbid.tmpl",
		"templates/pastbids.tmpl",
	}

	ctx := &Ctx{
		Hand: &Hand{
			Spades:   "AKQJT",
			Hearts:   "AKQJ",
			Diamonds: "AKQJ",
			Clubs:    "AKQJ",
		},
		Bids: []*Bid{
			&Bid{"South", "Pass"},
			&Bid{"West", "1H"},
			&Bid{"North", "1S"},
		},
	}

	tmpl := template.Must(template.ParseFiles(files...))
	tmpl.Execute(w, ctx)
}

type Ctx struct {
	Hand *Hand
	Bids []*Bid
}

type Hand struct {
	Spades   string
	Hearts   string
	Diamonds string
	Clubs    string
}

type Bid struct {
	Seat     string
	Contract string
}
