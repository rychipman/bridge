package main

import (
	"encoding/json"
	"fmt"
	"html/template"
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
	Deals    []*Deal
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
	router := mux.NewRouter()
	router.HandleFunc("/", DefaultHandler).Methods("GET")
	router.HandleFunc("/home", HomeHandler).Methods("GET")
	router.HandleFunc("/bid", BidHandler).Methods("GET")
	router.HandleFunc("/set/{id}", SetHandler).Methods("GET")
	router.HandleFunc("/deal/{id}", DealHandler).Methods("GET")
	router.HandleFunc("/user/{username}", UserHandler).Methods("GET")
	router.HandleFunc("/register", RegisterHandler).Methods("POST")
	http.ListenAndServe(":8080", router)
}

func handleApi(w http.ResponseWriter, r *http.Request) {
	fmt.Println("a;sdklfjas;kdfj")
	res := []byte("This is my response")
	w.Write(res)
}

func DefaultHandler(w http.ResponseWriter, r *http.Request) {
	// TODO
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

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	decoder := json.NewDecoder(r.Body)
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
