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
	r.HandleFunc("/auth", loginHandler).Methods("POST")

	authRouter := r.PathPrefix("/login").Subrouter()
	authRouter.Handle("/", http.FileServer(http.Dir("./pkg/web/app")))
	authRouter.PathPrefix("/img/").Handler(http.StripPrefix("/login/img/", http.FileServer(http.Dir("./pkg/web/app/login"))))
	authRouter.PathPrefix("/js/").Handler(http.StripPrefix("/login/js/", http.FileServer(http.Dir("./pkg/web/app/login"))))
	authRouter.PathPrefix("/css/").Handler(http.StripPrefix("/login/css/", http.FileServer(http.Dir("./pkg/web/app/login"))))

	homeRouter := r.PathPrefix("/").Subrouter()
	homeRouter.Use(middleware.Authorization)
	homeRouter.Handle("/", http.FileServer(http.Dir("./pkg/web/app/faythe-ui/dist")))
	homeRouter.PathPrefix("/js/").Handler(http.StripPrefix("/js/", http.FileServer(http.Dir("./pkg/web/app/faythe-ui/dist/js"))))
	homeRouter.PathPrefix("/css/").Handler(http.StripPrefix("/css/", http.FileServer(http.Dir("./pkg/web/app/faythe-ui/dist/css"))))
	homeRouter.PathPrefix("/img/").Handler(http.StripPrefix("/img/", http.FileServer(http.Dir("./pkg/web/app/faythe-ui/dist/img"))))

	homeRouter.HandleFunc("/clouds/", listClouds).Methods("GET")
	homeRouter.HandleFunc("/clouds/create", createCloud).Methods("POST")
	homeRouter.HandleFunc("/clouds/{id:[a-z 0-9]+}", deleteCloud).Methods("DELETE")

	homeRouter.HandleFunc("/healers/{pid:[a-z 0-9]+}", listHealers).Methods("GET")
	homeRouter.HandleFunc("/healers/{pid:[a-z 0-9]+}/{id:[a-z 0-9]+}", deleteHealer).Methods("DELETE")

	homeRouter.HandleFunc("/scalers/{pid:[a-z 0-9]+}", listScalers).Methods("GET")
	homeRouter.HandleFunc("/scalers/{pid:[a-z 0-9]+}/{id:[a-z 0-9]+}", deleteScaler).Methods("DELETE")
}
