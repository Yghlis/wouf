/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let lastPosition = { x: 0, y: 0 };  // Initialiser la dernière position connue
let lastDirection = 'down'; // Initialiser la dernière direction connue

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    // Track player's movement to determine the last known position and direction
    WA.player.onPlayerMove((moveData) => {
        lastPosition = { x: moveData.x, y: moveData.y };
        lastDirection = moveData.direction;
    });

    // Listen for messages from the iframe
    window.addEventListener('message', receiveMessage, false);

    function receiveMessage(event) {
        if (event.data && event.data.message === 'setRole') {
            const playerRole = event.data.role;
            console.log('Role selected by the player:', playerRole);
            // Here you can handle the player role, e.g., update game state or trigger new actions
        }
    }

    WA.room.area.onEnter('jitsiMeetingRoom').subscribe(async() => {
        console.log(`The player ${WA.player.name} has entered the zone.`);
        if (!WA.player.tags.includes('admin')) {
            console.log('Access denied to the jitsiMeetingRoom. You do not have the "admin" tag.');

            // Calculate a position in front of the jitsiMeetingRoom based on last direction
            let teleportX = lastPosition.x;
            let teleportY = lastPosition.y;

            switch (lastDirection) {
                case 'down': teleportY -= 1; break;
                case 'up': teleportY += 1; break;
                case 'left': teleportX += 1; break;
                case 'right': teleportX -= 1; break;
            }

            // Use teleport to move the player
            WA.player.teleport(teleportX, teleportY).then(() => {
                WA.ui.displayActionMessage({
                    message: "You cannot access this conference, please contact an administrator if the problem persists",
                    callback: () => {
                        console.log('The player has confirmed the message.');
                    },
                    type: "warning",
                });
            });
        } else {
            console.log('Welcome to the jitsiMeetingRoom!');
            await WA.players.configureTracking();
            const players = WA.players.list();
            for (const player of players) {
                console.log(`Player ${player.name} is near you`);
            }
        }
    });

    function openCalendar() {
        WA.ui.website.open({
            url: "./src/role/tableau.html",
            position: {
                vertical: "middle",
                horizontal: "middle"
            },
            size: {
                width: "90%",
                height: "90%"
            },
            visible: true,
            allowApi: true,
            allowPolicy: "fullscreen"
        }).then(website => {
            console.log("Calendar opened successfully");
            mycalendar = website;
        }).catch(err => {
            console.error("Error opening calendar", err);
        });
    }

    function receiveMessage(event) {
        if (event.data && event.data.message === 'setRole') {
            const playerRole = event.data.role;
            console.log('Role selected by the player:', playerRole);
            // Ajoute un console.log ici pour confirmer la réception et afficher la valeur
            console.log(`Received role from modal: ${playerRole}`);
        }
    }
    

    WA.room.area.onEnter('clock').subscribe(() => {
        openCalendar();
    });

    // Bootstrap the Scripting API Extra library
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

export {};