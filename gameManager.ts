namespace SpriteKind {
    export const Ingredient: number = SpriteKind.create();
    export const Plate: number = SpriteKind.create();
    export const Icon: number = SpriteKind.create();
    export const Conveyor: number = SpriteKind.create();
    export const UI: number = SpriteKind.create();
    // GH1
    export const WorkStation = SpriteKind.create();
    // end GH1
}

// GH1
namespace helperFunctions {
    export function ingredientSpriteFromType(ingredientType: IngredientType): Sprite {
        let imageAsset;
        switch (ingredientType) {
            case IngredientType.Bread:
                imageAsset = assets.image`bread`;
                break;
            case IngredientType.Lettuce:
                imageAsset = assets.image`lettuce`;
                break;
            case IngredientType.ChoppedLettuce:
                imageAsset = assets.image`chopped lettuce`;
                break;
            case IngredientType.Meat:
                imageAsset = assets.image`meat`;
                break;
            case IngredientType.Tomato:
                imageAsset = assets.image`tomato`;
                break;
            case IngredientType.ChoppedTomato:
                imageAsset = assets.image`chopped tomato`;
                break;
            default:
                throw "Unknown IngredientType";
        }
        return sprites.create(imageAsset, SpriteKind.UI)
    }

    export function ingredientImageFromType(ingredientType: IngredientType): Image {
        switch (ingredientType) {
            case IngredientType.Bread:
                return assets.image`bread`;
            case IngredientType.Lettuce:
                return assets.image`lettuce`;
            case IngredientType.ChoppedLettuce:
                return assets.image`chopped lettuce`;
            case IngredientType.Meat:
                return assets.image`meat`;
            case IngredientType.Tomato:
                return assets.image`tomato`;
            case IngredientType.ChoppedTomato:
                return assets.image`chopped tomato`;
            default:
                throw "Unknown IngredientType";
        }
    }
}
// end GH1

class GameManager {
    public playerSprite: PlayerSprite;
    private tileManager: TileManager;
    private tileMapLevels: tiles.TileMapData[];
    private currentOrder: Order;

    constructor() {
        this.initialisePlayer();
        this.tileManager = new TileManager(tilemap`kitchen`, this.playerSprite);
        this.tileManager.placeIngredientIcons();
        this.initialiseGameLoop();
        this.onUpdates();
    }

    private initialisePlayer(): void {
        info.setScore(0);
        this.playerSprite = new PlayerSprite();
        this.initialiseControls();
    }

    private initialiseControls(): void {
        controller.moveSprite(this.playerSprite.sprite);

        //carrying mechanics
        controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
            let nearbyPlates = spriteutils.getSpritesWithin(SpriteKind.Plate, 20, this.playerSprite.sprite)
            let nearbyIngredients = spriteutils.getSpritesWithin(SpriteKind.Ingredient, 20, this.playerSprite.sprite)
            let nearbyIcons = spriteutils.getSpritesWithin(SpriteKind.Icon, 20, this.playerSprite.sprite)

            if (this.playerSprite.heldItem) {
                this.handleDropLogic(nearbyPlates, nearbyIngredients, nearbyIcons);
            } else {
                this.handlePickupLogic(nearbyPlates, nearbyIngredients, nearbyIcons);
            }
        });

        // GH1
        controller.B.onEvent(ControllerButtonEvent.Pressed, function (): void {
            if (this.playerSprite.heldItem) {
                this.handleWorkStationLogic();
            }
        });
        // end GH1
    }

    private handleDropLogic(nearbyPlates: Sprite[], nearbyIngredients: Sprite[], nearbyIcons: Sprite[]): void {
        let nearbyConveyors = spriteutils.getSpritesWithin(SpriteKind.Conveyor, 20, this.playerSprite.sprite);
        // logic for plate specific dropping
        if (this.playerSprite.heldItem == this.currentOrder.plate) {
            if (nearbyConveyors.length > 0) {
                this.playerSprite.dropItem();
                nearbyConveyors[0].data.placeDish(this.currentOrder.plate);
                return;
            }
            return;
        }
        // logic for dropping ingredients onto plates or conveyors
        if (nearbyPlates.length > 0) {
            let correctIngredient = this.currentOrder.checkIngredients(this.playerSprite.heldItem.data.type);
            if (correctIngredient) {
                info.changeScoreBy(100);
                this.playerSprite.destroyItem();
            } else {
                this.playerSprite.dropItem();
            }
        } else if (nearbyConveyors.length > 0) {
            nearbyConveyors[0].data.placeDish(this.playerSprite.heldItem);
            this.playerSprite.dropItem();
        } else {
            this.playerSprite.dropItem();
        }
    }

    private handlePickupLogic(nearbyPlates: Sprite[], nearbyIngredients: Sprite[], nearbyIcons: Sprite[]): void {
        if (nearbyIngredients.length > 0) {
            this.playerSprite.pickupItem(nearbyIngredients[0]);
        } else if (nearbyPlates.length > 0 && this.currentOrder.cooked) {
            this.playerSprite.pickupItem(nearbyPlates[0]);
        } else if (nearbyIcons.length > 0) {
            let ingredient = nearbyIcons[0].data.spawnIngredient();
            this.playerSprite.pickupItem(ingredient.sprite);
        }
    }

    // GH1
    // returns true if a workstation has been interacted with
    private handleWorkStationLogic(): void {
        let nearbyWorkStations = spriteutils.getSpritesWithin(SpriteKind.WorkStation, 20, this.playerSprite.sprite);
        if (nearbyWorkStations.length > 0) {
            nearbyWorkStations[0].data.interact(this.playerSprite.heldItem)
        }
    }
    // end GH1

    private initialiseGameLoop(): void {
        this.currentOrder = new Order();
        sprites.onDestroyed(SpriteKind.Plate, function(): void {
            info.changeScoreBy(500);
            this.currentOrder = new Order();
        });
        info.startCountdown(60);
        info.onCountdownEnd(function(): void {
            game.over(true);
        });
    }

    private onUpdates(): void {
        game.onUpdate(function(): void {
            // player item carrying
            if(this.playerSprite.heldItem) {
                this.playerSprite.carryItem();
            }
            // conveyor dish carrying
            sprites.allOfKind(SpriteKind.Conveyor).forEach(function(conveyor: Sprite): void {
                if(conveyor.data.carriedDish) {
                    conveyor.data.carryDish();
                }
            });
        });
    }
}
