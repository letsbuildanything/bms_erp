import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const CommonCard = ({title}:{title: string}) => {

    return (
        <Card className="hover:cursor-pointer bg-blue-600/[0.85] text-white hover:bg-blue-800 hover:text-slate-100 hover:translate-y-0.5">
            <CardHeader>
                <CardTitle className="tracking-tighter">{title}</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default CommonCard;