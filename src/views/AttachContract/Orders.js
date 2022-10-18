import Loading from "../components/Loading"
import { Button, Card, Typography, CardContent } from "@mui/material"
import Title from '../components/Title'
export default function Order () {

    

    return<>
        <Title />
        <h3><i>You are <strong>Seller</strong></i></h3>

        
        <Loading message="Displaying contract..." />

        <Card sx={{ minWidth: 675 }}>
            <CardContent>
                <h2 className='text-center'><b>Contract Details</b></h2>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ingredient Name:
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Buyer Address:
                </Typography>
            </CardContent>
        </Card>
        <br />

        <div className="d-flex justify-content-between w-50">
            <Button variant="outlined">
                Accept Order
            </Button>
        
            <Button variant="outlined">
                Reject Order
            </Button>
        </div>
    </>
}