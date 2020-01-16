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

package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"github.com/vCloud-DFTBA/faythe-ui/pkg/config"
	"github.com/vCloud-DFTBA/faythe-ui/pkg/handler"
)

func main() {
	cfg := config.Get()
	r := mux.NewRouter()
	r.StrictSlash(true)

	headersOk := handlers.AllowedHeaders([]string{"Accept", "Authorization", "Content-Type", "Origin"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "POST", "DELETE"})
	credsOK := handlers.AllowCredentials()
	exposeHeaders := handlers.ExposedHeaders([]string{"Date"})

	handler.Register(r)

	if err := http.ListenAndServe(cfg.ServerAddress,
		handlers.CORS(headersOk, originsOk, methodsOk, exposeHeaders, credsOK)(r)); err != nil {
		fmt.Println(err.Error())
	}
}
