package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Position string

const (
	North Position = "North"
	East           = "East"
	South          = "South"
	West           = "West"
)

type Bid string

const (
	Pass     Bid = "P"
	Double       = "Dbl"
	Redouble     = "Rdbl"

	OneClub    Bid = "1C"
	OneDiamond     = "1D"
	OneHeart       = "1H"
	OneSpade       = "1S"
	OneNoTrump     = "1NT"

	TwoClub    Bid = "2C"
	TwoDiamond     = "2D"
	TwoHeart       = "2H"
	TwoSpade       = "2S"
	TwoNoTrump     = "2NT"

	ThreeClub    Bid = "3C"
	ThreeDiamond     = "3D"
	ThreeHeart       = "3H"
	ThreeSpade       = "3S"
	ThreeNoTrump     = "3NT"

	FourClub    Bid = "4C"
	FourDiamond     = "4D"
	FourHeart       = "4H"
	FourSpade       = "4S"
	FourNoTrump     = "4NT"

	FiveClub    Bid = "5C"
	FiveDiamond     = "5D"
	FiveHeart       = "5H"
	FiveSpade       = "5S"
	FiveNoTrump     = "5NT"

	SixClub    Bid = "6C"
	SixDiamond     = "6D"
	SixHeart       = "6H"
	SixSpade       = "6S"
	SixNoTrump     = "6NT"

	SevenClub    Bid = "7C"
	SevenDiamond     = "7D"
	SevenHeart       = "7H"
	SevenSpade       = "7S"
	SevenNoTrump     = "7NT"
)

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}

type Set struct {
	Criteria string
	//Deals    []*Deal
}

type Table struct {
	North  *Seat
	East   *Seat
	South  *Seat
	West   *Seat
	Dealer Position
	Bids   []Bid
}

type Seat struct {
	User    *User `json:"user"`
	IsRobot bool  `json:"is_robot"`
	Hand    *Hand `json:"hand"`
}

type Hand struct {
	Spades   []string `json:"spades"`
	Hearts   []string `json:"hearts"`
	Diamonds []string `json:"diamonds"`
	Clubs    []string `json:"diamonds"`
}

var users []*User

func main() {
	http.HandleFunc("/", DefaultHandler)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/api/", APIHandler)

	router := mux.NewRouter()
	router.HandleFunc("/home", HomeHandler).Methods("GET")
	router.HandleFunc("/bid", BidHandler).Methods("GET")
	router.HandleFunc("/set/{id}", SetHandler).Methods("GET")
	router.HandleFunc("/deal/{id}", DealHandler).Methods("GET")
	router.HandleFunc("/user/{username}", UserHandler).Methods("GET")
	router.HandleFunc("/register", RegisterHandler).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func DefaultHandler(w http.ResponseWriter, req *http.Request) {
	log.Printf("%+v\n", req)
	indexPage := `
<html>
	<head>
		<title>Bridge the Gap</title>
		<link href='/static/css/vendor/material.css' rel='stylesheet'>
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
		<link href='/static/css/style.css' rel='stylesheet'>
	</head>
	<body>
		<script src='/static/js/vendor/mithril.js'></script>
		<script src='/static/js/vendor/classnames.js'></script>
		<script src='/static/js/app.js'></script>
	</body>
</html>
`
	//<script src='/static/js/vendor/material.js'></script>
	//<script data-main='/static/js/app' src='/static/js/vendor/require.js'></script>
	w.Write([]byte(indexPage))
}

type testSet struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	Disabled bool   `json:"disabled"`
}

var testSets = []*testSet{
	{1, "one", true},
	{2, "two", true},
	{1, "one", false},
	{3, "three", false},
	{2, "two", false},
}

var oneTwoLast = false

func APIHandler(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if oneTwoLast {
		json.NewEncoder(w).Encode(testSets[2:])
		oneTwoLast = false
	} else {
		json.NewEncoder(w).Encode(testSets[0:2])
		oneTwoLast = true
	}
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, user := range users {
		if user.Username == params["username"] {
			json.NewEncoder(w).Encode(user)
			return
		}
	}
	json.NewEncoder(w).Encode(&User{})
}

func RegisterHandler(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	decoder := json.NewDecoder(req.Body)
	defer req.Body.Close()

	user := new(User)
	err := decoder.Decode(user)
	if err != nil {
		panic(err)
	}

	for _, u := range users {
		if u.Email == user.Email {
			w.WriteHeader(http.StatusUnprocessableEntity)
			return
		}
		if u.Username == user.Username {
			w.WriteHeader(http.StatusUnprocessableEntity)
			return
		}
	}

	users = append(users, user)

	w.WriteHeader(http.StatusCreated)
	encoder := json.NewEncoder(w)
	encoder.Encode(user)

	return
}

func BidHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

func SetHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

func DealHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	// TODO
}
