// Copyright (c) 2020 Dat Vu Tuan <tuandatk25a@gmail.com>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package handler

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/vCloud-DFTBA/faythe-ui/pkg/middleware"
)

func Register(r *mux.Router) {
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./pkg/web/static"))))

	authRouter := r.PathPrefix("/public").Subrouter()
	authRouter.HandleFunc("/auth", loginHandler).Methods("POST")
	authRouter.Handle("/", http.FileServer(http.Dir("./pkg/web/views"))).Methods("GET")

	homeRouter := r.PathPrefix("/").Subrouter()
	homeRouter.Use(middleware.Authorization)
	homeRouter.HandleFunc("/home", homeHandler).Methods("GET")
}

var homeHandler = func(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello World!"))
}
