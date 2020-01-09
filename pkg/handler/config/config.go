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

package config

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
)

type config struct {
	ServerAddress  string
	SecretKey      string
	Username       string
	Password       string
	FaytheURL      string
	FaytheUsername string
	FaythePassword string
}

var cfg *config

func Get() *config {
	if cfg == nil {
		cfg = &config{
			ServerAddress:  os.Getenv("SERVER_ADDR"),
			SecretKey:      os.Getenv("SECRET_KEY"),
			Username:       os.Getenv("USERNAME"),
			Password:       os.Getenv("PASSWORD"),
			FaytheURL:      os.Getenv("FAYTHE_URL"),
			FaytheUsername: os.Getenv("FAYTHE_USERNAME"),
			FaythePassword: os.Getenv("FAYTHE_PASSWORD"),
		}
	}
	return cfg
}
