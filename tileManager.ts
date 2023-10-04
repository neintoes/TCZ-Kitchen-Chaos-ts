class TileManager {
    public tileMap: tiles.TileMapData
    private playerSprite: PlayerSprite
    public conveyorLocations: tiles.Location[] = [];

    constructor(tileMap: tiles.TileMapData, playerSprite: PlayerSprite) {
        this.tileMap = tileMap;
        this.playerSprite = playerSprite;
        this.setupLevel();
    }

    public setupLevel(): void {
        tiles.setCurrentTilemap(this.tileMap);
        this.placePlayer();
        this.placeConveyors();
        this.placeWorkStations();
    }

    private placePlayer(): void {
        tiles.placeOnRandomTile(this.playerSprite.sprite, assets.tile`open door`)
    }

    public placeIngredientIcons(): void {
        new IngredientSpawner(IngredientType.Bread, tiles.getTileLocation(0, 2))
        new IngredientSpawner(IngredientType.Lettuce, tiles.getTileLocation(0, 3))
        new IngredientSpawner(IngredientType.Meat, tiles.getTileLocation(0, 4))
        new IngredientSpawner(IngredientType.Tomato, tiles.getTileLocation(0, 5))
    }

    private placeConveyors(): void {
        tiles.getTilesByType(assets.tile`conveyor spawn`).forEach(function(location: tiles.Location): void {
            new Conveyor(location);
        });
    }

    // GH1
    private placeWorkStations(): void {
        // chopping board
        let choppingBoard = new ChoppingBoard();
        tiles.placeOnRandomTile(choppingBoard.sprite, assets.tile`workstation`);
    }
    // end GH1
}
